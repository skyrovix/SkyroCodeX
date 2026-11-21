import { SupportedLanguage } from "@/types/language";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";

export interface LanguageSeoData {
  id: SupportedLanguage;
  name: string;
  version: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  headline: string;
  subheadline: string;
  tagline: string;
  runtimeSpec: {
    engine: string;
    version: string;
    timeout: string;
    memoryLimit: string;
    isolation: string;
  };
  features: string[];
  useCases: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SEO_LANGUAGES_MAP: Record<SupportedLanguage, LanguageSeoData> = {
  python: {
    id: "python",
    name: "Python 3",
    version: "3.10.0",
    seoTitle: "Online Python 3 Compiler & IDE | Run Python Online - SkyroCodeX",
    metaDescription:
      "Run, compile, and debug Python 3.10 code online in real time with SkyroCodeX by Skyrovix. Zero setup, pre-warmed sandbox, interactive stdin/stdout, and instant code sharing.",
    keywords: [
      "online python compiler",
      "run python online",
      "python 3 ide",
      "python sandbox in browser",
      "python web compiler",
      "python interpreter online",
      "learn python online",
      "skyrovix python compiler",
      "python dsa practice",
    ],
    headline: "Online Python 3 Compiler & Cloud Sandbox",
    subheadline:
      "Write, run, and share Python 3 code directly in your browser with high-performance isolated container execution.",
    tagline: "Python 3.10.0 runtime with comprehensive standard library and sub-millisecond start times.",
    runtimeSpec: {
      engine: "CPython 3 Linux Sandbox",
      version: "3.10.0",
      timeout: "5.0 seconds",
      memoryLimit: "256 MB",
      isolation: "Containerized Worker",
    },
    features: [
      "CPython 3.10.0 standard library (sys, math, json, collections, itertools, statistics)",
      "Standard input (stdin) redirection for interactive CLI programs",
      "Real-time separated stdout, stderr, and execution benchmarks",
      "One-click immutable snippet sharing and URL generation",
      "Full Monaco (VS Code) syntax highlighting, bracket matching, and auto-indentation",
    ],
    useCases: [
      "Data Structures & Algorithms (DSA) problem solving",
      "University computer science coursework & lab assignments",
      "Interview prep for LeetCode, HackerRank, and CodeChef",
      "Quick testing of Python algorithms, math equations, and functions",
    ],
    faqs: [
      {
        question: "How do I run Python code online with SkyroCodeX?",
        answer:
          "Type or paste your Python 3 code into the Monaco editor, optionally provide input in the 'Standard Input (stdin)' tab, and click the 'Run' button (or press Ctrl+Enter). Your code compiles and runs in an isolated Linux container with results streamed to the output console.",
      },
      {
        question: "What version of Python is supported?",
        answer:
          "SkyroCodeX runs Python 3.10.0 with full access to standard library modules like math, os, sys, random, json, re, itertools, and collections.",
      },
      {
        question: "Can I provide interactive user input to input()?",
        answer:
          "Yes! Click on the 'Standard Input (stdin)' panel in the right pane, enter your input line by line, and any calls to input() or sys.stdin.readline() will consume that data in sequence.",
      },
      {
        question: "Is this Python online compiler free to use?",
        answer:
          "Yes, SkyroCodeX is 100% free with unlimited executions, zero sign-in required, and instant snippet sharing.",
      },
    ],
  },

  javascript: {
    id: "javascript",
    name: "JavaScript (Node.js)",
    version: "18.15.0",
    seoTitle: "Online JavaScript (Node.js 18) Compiler & Runner | SkyroCodeX",
    metaDescription:
      "Execute modern JavaScript ES2022 and Node.js v18 code online. Test algorithms, async/await, and JSON manipulation with instant execution and zero local configuration.",
    keywords: [
      "online javascript compiler",
      "run javascript online",
      "node js online compiler",
      "js runner in browser",
      "node sandbox",
      "execute js online",
      "skyrocodex javascript",
      "test nodejs code online",
    ],
    headline: "Online JavaScript & Node.js 18 Code Runner",
    subheadline:
      "Run server-side JavaScript and Node.js algorithms in a high-speed sandboxed V8 engine with full ES2022 support.",
    tagline: "Node.js 18.15.0 LTS runtime with V8 optimization, async/await, and JSON utilities.",
    runtimeSpec: {
      engine: "V8 Engine / Node.js 18 LTS",
      version: "18.15.0",
      timeout: "5.0 seconds",
      memoryLimit: "256 MB",
      isolation: "Containerized Worker",
    },
    features: [
      "Full modern ECMAScript (ES6 to ES2022) feature support",
      "Standard Node.js built-ins: fs, path, crypto, events, util",
      "Promise, async/await, and event-loop execution inspection",
      "Instant error stack traces with exact line numbers",
    ],
    useCases: [
      "Testing JavaScript algorithmic logic and array manipulations",
      "Interview prep for full-stack and frontend engineering roles",
      "Prototyping Node.js helper functions and data transforms",
    ],
    faqs: [
      {
        question: "Which version of Node.js is executed?",
        answer:
          "SkyroCodeX executes Node.js v18.15.0 LTS with the modern Google V8 engine, supporting ES modules, async/await, and modern array methods.",
      },
      {
        question: "Can I use console.log and inspect object outputs?",
        answer:
          "Yes! All console.log, console.error, and console.warn calls are captured and formatted cleanly in the output panel.",
      },
      {
        question: "Does it support asynchronous code?",
        answer:
          "Yes, promises and async/await functions execute correctly within the 5-second container timeout window.",
      },
    ],
  },

  cpp: {
    id: "cpp",
    name: "C++ (G++)",
    version: "10.2.0",
    seoTitle: "Online C++ Compiler (GCC 10 / G++) | Run C++ Online - SkyroCodeX",
    metaDescription:
      "Compile and run C++ code online using modern GCC 10 with C++17/C++20 support. Ideal for competitive programming, DSA practice, LeetCode solutions, and academic homework.",
    keywords: [
      "online c++ compiler",
      "run c++ online",
      "g++ online compiler",
      "c++ ide in browser",
      "competitive programming c++",
      "leetcode c++ runner",
      "gcc c++ compiler",
      "skyrocodex cpp",
    ],
    headline: "Online C++ (G++) Compiler & Cloud IDE",
    subheadline:
      "Compile and run C++ programs with GCC 10.2, fast standard template library (STL), and stdin redirection.",
    tagline: "GNU G++ 10.2 with -O2 optimization and standard template library (STL).",
    runtimeSpec: {
      engine: "GNU C++ Compiler (g++)",
      version: "10.2.0 (C++17/20)",
      timeout: "5.0 seconds",
      memoryLimit: "256 MB",
      isolation: "Containerized Worker",
    },
    features: [
      "GCC 10.2.0 with standard optimizations (-O2)",
      "Complete STL support (vector, map, unordered_map, set, queue, stack, algorithm)",
      "Standard input (cin / scanf) support for multiple test cases",
      "Detailed compiler warnings and syntax error reporting",
    ],
    useCases: [
      "Competitive programming for Codeforces, CodeChef, and AtCoder",
      "DSA implementations: Binary Trees, Graphs, Dynamic Programming",
      "College C++ lab programming without local MinGW or Visual Studio setup",
    ],
    faqs: [
      {
        question: "Which C++ standard does this compiler use?",
        answer:
          "The compiler runs GCC 10.2.0 configured with modern C++ standards, allowing you to use auto types, lambdas, range-based for loops, and STL containers.",
      },
      {
        question: "How do I provide multiple test cases to cin?",
        answer:
          "Paste your test case data directly into the 'Standard Input (stdin)' tab before pressing Run. Your cin / scanf statements will read from it directly.",
      },
    ],
  },

  c: {
    id: "c",
    name: "C (GCC)",
    version: "10.2.0",
    seoTitle: "Online C Compiler (GCC 10) | Run C Programs Online - SkyroCodeX",
    metaDescription:
      "Compile and run standard C programs online with GCC 10.2. Zero installation of MinGW or Clang needed. Perfect for systems programming, pointers practice, and CS fundamentals.",
    keywords: [
      "online c compiler",
      "run c online",
      "gcc c compiler online",
      "c programming in browser",
      "learn c online",
      "c ide web",
      "pointers in c practice",
      "c language sandbox",
    ],
    headline: "Online C (GCC) Compiler & Execution Engine",
    subheadline:
      "Run C programs with GCC 10 in a secure sandbox. Perfect for learning pointers, memory structures, and algorithmic logic.",
    tagline: "GNU GCC 10.2 with standard C library (libc) and high-speed execution.",
    runtimeSpec: {
      engine: "GNU C Compiler (gcc)",
      version: "10.2.0",
      timeout: "5.0 seconds",
      memoryLimit: "256 MB",
      isolation: "Containerized Worker",
    },
    features: [
      "GCC 10.2.0 with standard C11/C18 conformance",
      "Standard C library: stdio.h, stdlib.h, string.h, math.h, time.h",
      "Memory boundary checks and segmentation fault detection",
      "Zero installation required on Windows, Mac, or Chromebooks",
    ],
    useCases: [
      "University CS101 / first-year programming lab exercises",
      "Mastering pointers, structs, linked lists, and memory management",
      "Testing algorithmic solutions in pure C",
    ],
    faqs: [
      {
        question: "Do I need to install GCC or MinGW on my computer?",
        answer:
          "No! SkyroCodeX runs completely in your web browser. All compilation and linking happens on pre-warmed cloud Linux servers.",
      },
      {
        question: "How does stdin work for scanf() in C?",
        answer:
          "Enter your inputs into the Standard Input (stdin) tab before clicking Run. Each scanf call reads tokens in order.",
      },
    ],
  },

  java: {
    id: "java",
    name: "Java",
    version: "15.0.2",
    seoTitle: "Online Java Compiler (OpenJDK 15) | Run Java Online - SkyroCodeX",
    metaDescription:
      "Write, compile, and execute Java programs online with OpenJDK 15. Zero JDK or JVM installation needed. Supports OOP, Collections Framework, Streams, and algorithms.",
    keywords: [
      "online java compiler",
      "run java online",
      "openjdk online",
      "java ide in browser",
      "java compiler with stdin",
      "learn java online",
      "skyrovix java",
      "java oop online playground",
    ],
    headline: "Online Java Compiler & Cloud Runtime",
    subheadline:
      "Compile and execute Java classes with OpenJDK 15. Practice Object-Oriented Programming, Collections, and DSA without JDK setup.",
    tagline: "OpenJDK 15.0.2 HotSpot JVM with modern Java syntax.",
    runtimeSpec: {
      engine: "OpenJDK HotSpot 64-Bit Server VM",
      version: "15.0.2",
      timeout: "5.0 seconds",
      memoryLimit: "256 MB",
      isolation: "Containerized Worker",
    },
    features: [
      "OpenJDK 15.0.2 runtime with HotSpot JIT compiler",
      "Full java.util (ArrayList, HashMap, LinkedList, Collections) support",
      "Scanner / BufferedReader input reading via stdin",
      "Clean javac compiler error traces with line highlights",
    ],
    useCases: [
      "Java OOP principles practice (Inheritance, Polymorphism, Interfaces)",
      "Data structures & algorithms in Java",
      "Academic computer science courses (AP CS, BCA, B.Tech CSE)",
    ],
    faqs: [
      {
        question: "What should the public class name be?",
        answer:
          "By convention, your primary class containing public static void main(String[] args) should be named 'Main'.",
      },
      {
        question: "Can I use Java 8+ features like Streams and Lambdas?",
        answer:
          "Yes! OpenJDK 15 supports lambda expressions, Streams API, var keyword, records, and text blocks.",
      },
    ],
  },

  go: {
    id: "go",
    name: "Go (Golang)",
    version: "1.16.2",
    seoTitle: "Online Go (Golang) Compiler & Runner | SkyroCodeX",
    metaDescription:
      "Compile and run Golang online with official Go 1.16 tooling. Test goroutines, channels, structs, slices, and standard library packages with sub-second execution.",
    keywords: [
      "online go compiler",
      "golang online playground",
      "run go online",
      "golang ide in browser",
      "go runner",
      "skyrocodex go",
      "test golang code online",
    ],
    headline: "Online Go (Golang) Playground & Sandbox",
    subheadline:
      "Write and run Go code in the cloud with official Go toolchains, fast compilation, and concurrent goroutine support.",
    tagline: "Official Go 1.16.2 compiler with standard library and concurrent runtime.",
    runtimeSpec: {
      engine: "Official Go Toolchain",
      version: "1.16.2",
      timeout: "5.0 seconds",
      memoryLimit: "256 MB",
      isolation: "Containerized Worker",
    },
    features: [
      "Fast compilation to native binary with go run",
      "Support for fmt, time, strings, sort, math, sync, and more",
      "Concurrent goroutines and channels execution",
      "Standard input redirection for bufio and fmt.Scan",
    ],
    useCases: [
      "Learning Golang fundamentals: structs, pointers, interfaces",
      "Experimenting with concurrency and channel pipelines",
      "Prototyping cloud microservices logic",
    ],
    faqs: [
      {
        question: "Can I use goroutines and channels?",
        answer:
          "Yes! Go's lightweight concurrency model runs seamlessly inside the sandboxed container.",
      },
    ],
  },

  php: {
    id: "php",
    name: "PHP",
    version: "8.2.3",
    seoTitle: "Online PHP 8 Compiler & Sandbox | Run PHP Online - SkyroCodeX",
    metaDescription:
      "Test and run PHP 8 scripts online. Perfect for validating algorithms, array functions, regex, and JSON APIs in an isolated cloud CLI environment.",
    keywords: [
      "online php compiler",
      "run php online",
      "php 8 sandbox",
      "php cli runner",
      "test php online",
      "skyrovix php",
      "php array functions online",
    ],
    headline: "Online PHP 8.2 Execution Sandbox",
    subheadline:
      "Run PHP 8 code in a cloud CLI runtime. Inspect variables, validate array manipulations, and test JSON formatting instantly.",
    tagline: "PHP 8.2.3 Zend Engine with JIT support and modern typing.",
    runtimeSpec: {
      engine: "PHP Zend Engine CLI",
      version: "8.2.3",
      timeout: "5.0 seconds",
      memoryLimit: "256 MB",
      isolation: "Containerized Worker",
    },
    features: [
      "PHP 8.2 modern features: match expressions, typed properties, nullsafe operator",
      "Comprehensive string, array, and regex standard library functions",
      "JSON encode/decode inspection and debugging",
    ],
    useCases: [
      "Rapid testing of PHP logic, regex, and date handling",
      "Web development interview prep",
      "Testing algorithms without running a local Apache/Nginx web server",
    ],
    faqs: [
      {
        question: "Which version of PHP is executed?",
        answer: "SkyroCodeX runs PHP 8.2.3 with modern syntax and type safety.",
      },
    ],
  },

  sql: {
    id: "sql",
    name: "SQL (SQLite)",
    version: "3.36.0",
    seoTitle: "Online SQL Compiler & SQLite Sandbox | Run Queries Online - SkyroCodeX",
    metaDescription:
      "Run SQL queries online in an in-memory SQLite sandbox. Create tables, insert data, join relations, and view instant query results without installing database servers.",
    keywords: [
      "online sql compiler",
      "run sql online",
      "sqlite sandbox in browser",
      "learn sql online",
      "test sql queries",
      "sql editor web",
      "database practice online",
      "sql join practice",
    ],
    headline: "Online SQL Compiler & Interactive SQLite Sandbox",
    subheadline:
      "Execute DDL, DML, and complex relational SQL queries in an instant in-memory SQLite database engine.",
    tagline: "SQLite 3.36.0 in-memory relational database engine with ANSI SQL compliance.",
    runtimeSpec: {
      engine: "SQLite 3 In-Memory Engine",
      version: "3.36.0",
      timeout: "5.0 seconds",
      memoryLimit: "256 MB",
      isolation: "In-Memory Sandbox",
    },
    features: [
      "Full SQLite 3 SQL standard: CREATE TABLE, INSERT, SELECT, UPDATE, DELETE",
      "Relational operations: INNER JOIN, LEFT JOIN, GROUP BY, HAVING, ORDER BY",
      "Window functions and Common Table Expressions (WITH queries)",
      "Instant tabular/textual output formatting",
    ],
    useCases: [
      "Practicing SQL queries for database interviews and certifications",
      "College RDBMS lab experiments and homework",
      "Testing complex relational schemas and sample datasets",
    ],
    faqs: [
      {
        question: "Do I need to install MySQL or PostgreSQL?",
        answer:
          "No. The SQLite sandbox runs in-memory with zero installation. You can define schemas with CREATE TABLE, insert mock records, and run SELECT queries immediately.",
      },
    ],
  },

  web: {
    id: "web",
    name: "Web (HTML / CSS / JS)",
    version: "HTML5",
    seoTitle: "Online Web Preview & Editor (HTML, CSS, JS) | SkyroCodeX",
    metaDescription:
      "Build and preview responsive web pages online with live iframe sandboxing. Multi-tab editor for HTML, CSS, and JavaScript with instant visual rendering.",
    keywords: [
      "online html editor",
      "live web preview",
      "html css js sandbox",
      "codepen alternative",
      "online frontend playground",
      "run html online",
      "web design sandbox in browser",
    ],
    headline: "Online HTML, CSS & JavaScript Sandbox with Live Preview",
    subheadline:
      "Build interactive frontend pages with a multi-tab Monaco editor and an isolated, real-time live preview window.",
    tagline: "Full HTML5, modern CSS3 (Flexbox/Grid), and ES6+ JavaScript live browser runtime.",
    runtimeSpec: {
      engine: "Sandboxed Web Browser Iframe",
      version: "HTML5 / CSS3 / ES6+",
      timeout: "Unlimited Client-side",
      memoryLimit: "Browser Thread",
      isolation: "Sandboxed iframe (allow-scripts, allow-modals)",
    },
    features: [
      "Dedicated multi-tab editor for index.html, styles.css, and script.js",
      "Real-time sandboxed iframe preview with zero external dependencies",
      "Instant DOM manipulation, click handlers, and responsive CSS testing",
      "One-click sharing for web design prototypes and bug reproductions",
    ],
    useCases: [
      "Prototyping responsive HTML/CSS designs and interactive cards",
      "Practicing frontend web development without configuring VS Code or Live Server",
      "Sharing interactive frontend widgets and UI components",
    ],
    faqs: [
      {
        question: "How does the live web preview work?",
        answer:
          "SkyroCodeX bundles your HTML, CSS, and JavaScript files into a secure, sandboxed browser iframe that renders instantly with full interactivity.",
      },
    ],
  },
};

export const ALL_SEO_LANGUAGES = Object.values(SEO_LANGUAGES_MAP);

export function getLanguageSeoData(id: string): LanguageSeoData {
  return SEO_LANGUAGES_MAP[id as SupportedLanguage] || SEO_LANGUAGES_MAP.python;
}
