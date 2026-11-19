"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Check, Copy, Share2, Globe, Lock } from "lucide-react";

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortId: string;
  isPublic?: boolean;
}

export function ShareModal({ isOpen, onClose, shortId, isPublic = true }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/s/${shortId}` : `/s/${shortId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Snippet"
      description="Anyone with this unique link can view and run your code."
    >
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-slate-400 mb-1.5 block">
            Unique Shareable Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Button variant="primary" size="sm" onClick={handleCopy} className="h-9 gap-1.5">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-400 space-y-1.5">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <Globe className="h-4 w-4 text-emerald-400" />
            <span>Publicly Viewable & Forkable</span>
          </div>
          <p>
            Recipients can view this code, execute it in the sandbox, and fork their own editable copy.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}
