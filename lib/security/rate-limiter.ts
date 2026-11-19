export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export interface RateLimiter {
  limit(identifier: string): Promise<RateLimitResult>;
}

/**
 * In-Memory Sliding Window Rate Limiter for Local Development & Testing
 */
export class MemoryRateLimiter implements RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests = 30, windowSeconds = 60) {
    this.maxRequests = maxRequests;
    this.windowMs = windowSeconds * 1000;

    // Periodic cleanup of stale IPs every 5 minutes
    if (typeof setInterval !== "undefined") {
      setInterval(() => this.cleanup(), 5 * 60 * 1000).unref?.();
    }
  }

  async limit(identifier: string): Promise<RateLimitResult> {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    let timestamps = this.requests.get(identifier) || [];
    // Filter out timestamps outside the current window
    timestamps = timestamps.filter((time) => time > windowStart);

    if (timestamps.length >= this.maxRequests) {
      const oldest = timestamps[0];
      const reset = Math.ceil((oldest + this.windowMs - now) / 1000);
      return {
        success: false,
        limit: this.maxRequests,
        remaining: 0,
        reset,
      };
    }

    timestamps.push(now);
    this.requests.set(identifier, timestamps);

    return {
      success: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - timestamps.length,
      reset: Math.ceil(this.windowMs / 1000),
    };
  }

  private cleanup() {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    for (const [key, timestamps] of this.requests.entries()) {
      const valid = timestamps.filter((t) => t > windowStart);
      if (valid.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, valid);
      }
    }
  }
}

/**
 * Upstash Redis Serverless REST API Rate Limiter for Production
 */
export class UpstashRedisRateLimiter implements RateLimiter {
  private url: string;
  private token: string;
  private maxRequests: number;
  private windowSeconds: number;

  constructor(
    url = process.env.UPSTASH_REDIS_REST_URL,
    token = process.env.UPSTASH_REDIS_REST_TOKEN,
    maxRequests = 30,
    windowSeconds = 60
  ) {
    this.url = url || "";
    this.token = token || "";
    this.maxRequests = maxRequests;
    this.windowSeconds = windowSeconds;
  }

  async limit(identifier: string): Promise<RateLimitResult> {
    if (!this.url || !this.token) {
      // Graceful fallback to memory limiter if Upstash is not fully configured
      return new MemoryRateLimiter(this.maxRequests, this.windowSeconds).limit(identifier);
    }

    try {
      const key = `ratelimit:skyrocodex:${identifier}`;
      // Execute multi-command pipeline via Upstash REST: INCR + EXPIRE
      const pipelineUrl = `${this.url}/pipeline`;
      const response = await fetch(pipelineUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, this.windowSeconds, "NX"],
          ["TTL", key],
        ]),
      });

      if (!response.ok) {
        throw new Error(`Upstash response failed with status ${response.status}`);
      }

      const results = await response.json();
      const currentCount = results[0]?.result ?? 1;
      const ttl = results[2]?.result ?? this.windowSeconds;

      const success = currentCount <= this.maxRequests;
      const remaining = Math.max(0, this.maxRequests - currentCount);

      return {
        success,
        limit: this.maxRequests,
        remaining,
        reset: ttl,
      };
    } catch (error) {
      console.warn("Upstash Rate Limiting error, falling back to permissive mode:", error);
      return {
        success: true,
        limit: this.maxRequests,
        remaining: this.maxRequests,
        reset: 0,
      };
    }
  }
}

// Global singleton instance
let globalRateLimiter: RateLimiter | null = null;

export function getRateLimiter(): RateLimiter {
  if (!globalRateLimiter) {
    const maxReq = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "30", 10);
    const windowSec = parseInt(process.env.RATE_LIMIT_WINDOW_SECONDS || "60", 10);
    const type = (process.env.RATE_LIMIT_TYPE || "memory").toLowerCase();

    if (type === "upstash" && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      globalRateLimiter = new UpstashRedisRateLimiter(
        process.env.UPSTASH_REDIS_REST_URL,
        process.env.UPSTASH_REDIS_REST_TOKEN,
        maxReq,
        windowSec
      );
    } else {
      globalRateLimiter = new MemoryRateLimiter(maxReq, windowSec);
    }
  }
  return globalRateLimiter;
}
