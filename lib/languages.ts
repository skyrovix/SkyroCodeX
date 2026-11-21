import { LanguageConfig, SupportedLanguage } from "@/types/language";

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  python: {
    id: "python",
    name: "Python 3",
    version: "3.10.0",
    monacoLang: "python",
    fileExtension: ".py",
    defaultFileName: "main.py",
    pistonRuntime: {
      language: "python",
      version: "3.10.0",
    },
    judge0Id: 71,
    starterCode: `# SkyroCodeX - Python 3
# Write your code here and press 'Run' or Ctrl+Enter

def greet(name: str) -> str:
    return f"Hello, {name}! Welcome to SkyroCodeX."

def fibonacci(n: int) -> list[int]:
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence

if __name__ == "__main__":
    print(greet("Skyrovix Developer"))
    print("Fibonacci sequence (first 10 numbers):")
    print(fibonacci(10))
`,
  },

  javascript: {
    id: "javascript",
    name: "JavaScript (Node.js)",
    version: "18.15.0",
    monacoLang: "javascript",
    fileExtension: ".js",
    defaultFileName: "index.js",
    pistonRuntime: {
      language: "javascript",
      version: "18.15.0",
    },
    judge0Id: 63,
    starterCode: `// SkyroCodeX - JavaScript (Node.js)
// Write your code here and press 'Run' or Ctrl+Enter

function calculateStats(numbers) {
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const avg = sum / numbers.length;
  const max = Math.max(...numbers);
  const min = Math.min(...numbers);
  return { sum, avg, max, min };
}

const data = [12, 45, 68, 23, 89, 34, 91, 5];
console.log("Welcome to SkyroCodeX by Skyrovix!");
console.log("Analyzing data array:", data);
console.log("Results:", calculateStats(data));
`,
  },

  java: {
    id: "java",
    name: "Java",
    version: "15.0.2",
    monacoLang: "java",
    fileExtension: ".java",
    defaultFileName: "Main.java",
    pistonRuntime: {
      language: "java",
      version: "15.0.2",
    },
    judge0Id: 62,
    starterCode: `// SkyroCodeX - Java
// Note: Keep class name as Main for compilation

import java.util.ArrayList;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        System.out.println("SkyroCodeX :: High Performance Java Runtime");
        
        ArrayList<String> techStack = new ArrayList<>();
        techStack.add("Next.js 15");
        techStack.add("Monaco Editor");
        techStack.add("Piston Sandbox");
        techStack.add("Supabase RLS");
        
        System.out.println("Built with:");
        for (int i = 0; i < techStack.size(); i++) {
            System.out.println((i + 1) + ". " + techStack.get(i));
        }
    }
}
`,
  },

  c: {
    id: "c",
    name: "C (GCC)",
    version: "10.2.0",
    monacoLang: "c",
    fileExtension: ".c",
    defaultFileName: "main.c",
    pistonRuntime: {
      language: "c",
      version: "10.2.0",
    },
    judge0Id: 50,
    starterCode: `/* SkyroCodeX - C (GCC) */
#include <stdio.h>

void print_banner() {
    printf("===============================\\n");
    printf("   SkyroCodeX Online Compiler  \\n");
    printf("        by Skyrovix            \\n");
    printf("===============================\\n");
}

int main() {
    print_banner();
    
    int a = 15;
    int b = 27;
    int sum = a + b;
    
    printf("Calculating: %d + %d = %d\\n", a, b, sum);
    printf("Status: Execution completed successfully.\\n");
    return 0;
}
`,
  },

  cpp: {
    id: "cpp",
    name: "C++ (G++)",
    version: "10.2.0",
    monacoLang: "cpp",
    fileExtension: ".cpp",
    defaultFileName: "main.cpp",
    pistonRuntime: {
      language: "c++",
      version: "10.2.0",
    },
    judge0Id: 54,
    starterCode: `// SkyroCodeX - C++ (G++)
#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>

int main() {
    std::cout << ">>> SkyroCodeX C++ Modern Engine\\n";
    
    std::vector<int> nums = {10, 20, 30, 40, 50};
    int total = std::accumulate(nums.begin(), nums.end(), 0);
    
    std::cout << "Elements count: " << nums.size() << "\\n";
    std::cout << "Sum of elements: " << total << "\\n";
    
    return 0;
}
`,
  },

  go: {
    id: "go",
    name: "Go",
    version: "1.16.2",
    monacoLang: "go",
    fileExtension: ".go",
    defaultFileName: "main.go",
    pistonRuntime: {
      language: "go",
      version: "1.16.2",
    },
    judge0Id: 60,
    starterCode: `// SkyroCodeX - Go
package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("🚀 SkyroCodeX Go Runtime")
	fmt.Printf("Current UTC Time: %s\\n", time.Now().UTC().Format(time.RFC1123))
	
	channels := []string{"Python", "JavaScript", "C++", "Go", "Rust"}
	fmt.Println("Supported sandboxed environments:")
	for idx, lang := range channels {
		fmt.Printf("  [%d] %s\\n", idx+1, lang)
	}
}
`,
  },

  php: {
    id: "php",
    name: "PHP",
    version: "8.2.3",
    monacoLang: "php",
    fileExtension: ".php",
    defaultFileName: "index.php",
    pistonRuntime: {
      language: "php",
      version: "8.2.3",
    },
    judge0Id: 68,
    starterCode: `<?php
// SkyroCodeX - PHP
header('Content-Type: text/plain');

echo "=== SkyroCodeX PHP Engine ===\\n";
$frameworks = ["Next.js", "Laravel", "Tailwind", "Monaco"];

echo "Array dump:\\n";
foreach ($frameworks as $key => $name) {
    echo "  [{$key}] => {$name}\\n";
}

$payload = [
    "platform" => "SkyroCodeX",
    "creator" => "Skyrovix",
    "status" => "running",
    "version" => phpversion()
];

echo "\\nJSON encoded output:\\n";
echo json_encode($payload, JSON_PRETTY_PRINT) . "\\n";
`,
  },

  sql: {
    id: "sql",
    name: "SQL (SQLite)",
    version: "3.36.0",
    monacoLang: "sql",
    fileExtension: ".sql",
    defaultFileName: "query.sql",
    pistonRuntime: {
      language: "sqlite3",
      version: "3.36.0",
    },
    judge0Id: 82,
    starterCode: `-- SkyroCodeX - SQL (SQLite3)
-- Write SQL queries below; they execute inside an in-memory SQLite sandbox

CREATE TABLE developers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    favorite_lang TEXT NOT NULL,
    snippets_created INTEGER DEFAULT 0
);

INSERT INTO developers (name, role, favorite_lang, snippets_created) VALUES
    ('Alex Chen', 'Full Stack Engineer', 'TypeScript', 42),
    ('Samantha Ray', 'Systems Architect', 'Rust', 89),
    ('Jordan Smith', 'Data Scientist', 'Python', 65),
    ('Elena Rostova', 'Kernel Developer', 'C++', 114);

SELECT * FROM developers ORDER BY snippets_created DESC;
`,
  },

  html: {
    id: "html",
    name: "HTML5",
    version: "5",
    monacoLang: "html",
    fileExtension: ".html",
    defaultFileName: "index.html",
    isWebPreview: true,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkyroCodeX HTML5 Playground</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #0b0f19;
      color: #f8fafc;
    }
    .card {
      text-align: center;
      padding: 2.5rem;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(12px);
      border-radius: 1rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.1);
      max-width: 420px;
    }
    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: rgba(249, 115, 22, 0.15);
      color: #fb923c;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border: 1px solid rgba(249, 115, 22, 0.35);
      margin-bottom: 1rem;
    }
    h1 {
      margin: 0 0 0.5rem;
      font-size: 2.2rem;
      background: linear-gradient(to right, #ff5722, #f59e0b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p { color: #94a3b8; font-size: 0.95rem; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Skyrovix HTML5 Engine</span>
    <h1>Hello, World!</h1>
    <p>Live, instant HTML5 sandbox rendering by SkyroCodeX.</p>
  </div>
</body>
</html>`,
  },

  css: {
    id: "css",
    name: "CSS3",
    version: "3",
    monacoLang: "css",
    fileExtension: ".css",
    defaultFileName: "styles.css",
    isWebPreview: true,
    starterCode: `/* SkyroCodeX - Modern CSS3 Playground */
:root {
  --primary: #ff5722;
  --accent: #f59e0b;
  --bg-dark: #0b0f19;
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, #1e1b4b 0%, var(--bg-dark) 100%);
  font-family: system-ui, -apple-system, sans-serif;
  color: #fff;
}

.card {
  position: relative;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  text-align: center;
  animation: float 4s ease-in-out infinite;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  border: 1px solid rgba(59, 130, 246, 0.35);
  margin-bottom: 1rem;
}

.gradient-text {
  margin: 0 0 0.5rem;
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  color: #94a3b8;
  font-size: 0.95rem;
  margin: 0;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
`,
  },

  web: {
    id: "web",
    name: "Web (HTML / CSS / JS)",
    version: "HTML5",
    monacoLang: "html",
    fileExtension: ".html",
    defaultFileName: "index.html",
    isWebPreview: true,
    files: [
      {
        name: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>SkyroCodeX Web Preview</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="card">
    <div class="badge">Skyrovix Interactive</div>
    <h1 id="title">Hello World!</h1>
    <p id="currentTime">Loading time...</p>
    <button id="counterBtn" class="btn">Clicks: <span id="count">0</span></button>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      },
      {
        name: "styles.css",
        language: "css",
        content: `body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: linear-gradient(135deg, #0b0f19 0%, #1e1b4b 100%);
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  max-width: 420px;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(255, 87, 34, 0.15);
  color: #fb923c;
  border-radius: 9999px;
  border: 1px solid rgba(255, 87, 34, 0.35);
  margin-bottom: 1rem;
}

h1 {
  margin: 0 0 0.5rem;
  font-size: 2.2rem;
  background: linear-gradient(to right, #ff5722, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  color: #94a3b8;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.btn {
  background: linear-gradient(to right, #ff5722, #f97316);
  border: none;
  color: white;
  padding: 0.75rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 87, 34, 0.45);
}`,
      },
      {
        name: "script.js",
        language: "javascript",
        content: `// Dynamic preview script
function updateTime() {
  const now = new Date();
  const timeElem = document.getElementById("currentTime");
  if (timeElem) {
    timeElem.textContent = now.toUTCString();
  }
}

updateTime();
setInterval(updateTime, 1000);

let count = 0;
const btn = document.getElementById("counterBtn");
const countSpan = document.getElementById("count");

if (btn && countSpan) {
  btn.addEventListener("click", () => {
    count++;
    countSpan.textContent = count;
  });
}`,
      },
    ],
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>SkyroCodeX Web Preview</title>
</head>
<body>
  <h1>Hello from SkyroCodeX!</h1>
</body>
</html>`,
  },
};

export const LANGUAGE_LIST = Object.values(SUPPORTED_LANGUAGES);

export function getLanguageConfig(id: string): LanguageConfig {
  return SUPPORTED_LANGUAGES[id as SupportedLanguage] || SUPPORTED_LANGUAGES.python;
}

