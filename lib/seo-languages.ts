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
    seoTitle: "Python Online Compiler - Run Python 3 Code Online | SkyroCodeX",
    metaDescription:
      "Free online Python 3 compiler & cloud IDE. Write, compile, and run Python 3.10 in your browser with interactive stdin input, pre-warmed Linux sandbox, and instant code sharing.",
    keywords: [
      "python online compiler",
      "online python compiler",
      "run python online",
      "python 3 compiler online",
      "python compiler with stdin",
      "free python compiler online",
      "python runner in browser",
      "python ide online",
      "cpython 3 sandbox",
      "learn python online",
      "python code runner",
      "best python online compiler",
      "skyrocodex python compiler",
      "python dsa practice online",
    ],
    headline: "Python Online Compiler & Cloud IDE",
    subheadline:
      "Write, run, and share Python 3 code directly in your browser with high-performance isolated container execution and stdin input.",
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
      "Standard input (stdin) redirection for interactive CLI programs and competitive coding",
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
    seoTitle: "JavaScript Online Compiler (Node.js 18) - Run JS Code Online | SkyroCodeX",
    metaDescription:
      "Free online JavaScript compiler and Node.js v18 code runner. Test algorithms, async/await, and JSON manipulation with instant execution and zero local configuration.",
    keywords: [
      "javascript online compiler",
      "online javascript compiler",
      "run javascript online",
      "node js online compiler",
      "js runner in browser",
      "node sandbox online",
      "execute js online",
      "free javascript compiler",
      "javascript compiler online",
      "skyrocodex javascript",
      "test nodejs code online",
    ],
    headline: "JavaScript Online Compiler & Node.js 18 Runner",
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
    seoTitle: "C++ Online Compiler (GCC 10 / G++) - Run C++ Code Online | SkyroCodeX",
    metaDescription:
      "Free online C++ compiler using GCC 10 with C++17/C++20 and STL support. Ideal for competitive programming, DSA practice, LeetCode solutions, and academic homework.",
    keywords: [
      "c++ online compiler",
      "online c++ compiler",
      "run c++ online",
      "g++ online compiler",
      "c++ compiler online",
      "c++ compiler with stdin",
      "c++ ide in browser",
      "free c++ ide online",
      "competitive programming c++",
      "leetcode c++ runner",
      "gcc c++ compiler",
      "skyrocodex cpp",
    ],
    headline: "C++ Online Compiler & Cloud Sandbox",
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
    seoTitle: "C Online Compiler (GCC 10) - Run C Programs Online | SkyroCodeX",
    metaDescription:
      "Free online C compiler with GCC 10.2. Zero installation of MinGW or Clang needed. Perfect for systems programming, pointers practice, and CS lab fundamentals.",
    keywords: [
      "c online compiler",
      "online c compiler",
      "run c online",
      "gcc c compiler online",
      "c compiler online",
      "c programming in browser",
      "c compiler with stdin",
      "free c online compiler",
      "learn c online",
      "c ide web",
      "pointers in c practice",
      "c language sandbox",
      "skyrocodex c",
    ],
    headline: "C Online Compiler & GCC Execution Engine",
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
    seoTitle: "Java Online Compiler (OpenJDK 15) - Run Java Code Online | SkyroCodeX",
    metaDescription:
      "Free online Java compiler with OpenJDK 15. Zero JDK installation needed. Practice OOP, Collections Framework, Streams, and algorithms with interactive stdin input.",
    keywords: [
      "java online compiler",
      "online java compiler",
      "run java online",
      "openjdk online compiler",
      "java compiler online",
      "java ide in browser",
      "java compiler with stdin",
      "free java online compiler",
      "learn java online",
      "skyrovix java",
      "java oop online playground",
      "skyrocodex java",
    ],
    headline: "Java Online Compiler & Cloud Runtime",
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
    seoTitle: "Go Online Compiler - Run Golang Code Online | SkyroCodeX",
    metaDescription:
      "Free online Go compiler and Golang playground. Compile and run Go 1.16 code in your browser with goroutines, channels, fast execution, and instant sharing.",
    keywords: [
      "go online compiler",
      "online go compiler",
      "golang online playground",
      "run go online",
      "golang online compiler",
      "go runner in browser",
      "free go compiler",
      "golang ide online",
      "skyrocodex go",
      "test golang code online",
    ],
    headline: "Go (Golang) Online Compiler & Cloud Sandbox",
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
    seoTitle: "PHP Online Compiler - Run PHP 8 Code Online | SkyroCodeX",
    metaDescription:
      "Free online PHP compiler and PHP 8 sandbox. Run, test, and debug PHP scripts with instant CLI output, array validation, regex tools, and zero local server setup.",
    keywords: [
      "php online compiler",
      "online php compiler",
      "run php online",
      "php 8 online compiler",
      "php sandbox online",
      "php cli runner",
      "test php code online",
      "free php compiler",
      "php ide in browser",
      "skyrovix php",
      "skyrocodex php",
    ],
    headline: "PHP Online Compiler & Cloud Sandbox",
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
    seoTitle: "SQL Online Compiler - Run SQLite Queries Online | SkyroCodeX",
    metaDescription:
      "Free online SQL compiler and SQLite query runner. Create tables, insert records, test JOINs, aggregations, and subqueries online with instant tabular output.",
    keywords: [
      "sql online compiler",
      "online sql compiler",
      "run sql online",
      "sqlite sandbox in browser",
      "sql query runner online",
      "learn sql online",
      "test sql queries online",
      "sql editor web",
      "free sql compiler",
      "database practice online",
      "sql join practice online",
      "skyrocodex sql",
    ],
    headline: "SQL Online Compiler & Interactive SQLite Sandbox",
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

  html: {
    id: "html",
    name: "HTML5",
    version: "HTML5",
    seoTitle: "HTML Online Compiler - Run HTML5 Code Online with Live Preview | SkyroCodeX",
    metaDescription:
      "Free online HTML compiler and interactive editor with live instant preview. Run, test, and write HTML5, CSS3, and JavaScript code in your browser with zero setup, responsive mobile view, and instant sharing. Powered by Skyrovix.",
    keywords: [
      "html online compiler",
      "online html compiler",
      "html compiler online",
      "run html online",
      "html editor online with live preview",
      "free html online compiler",
      "html runner",
      "html sandbox in browser",
      "html preview online",
      "html5 online compiler",
      "html code runner",
      "learn html online",
      "html test online",
      "html compiler free",
      "best html online compiler",
      "skyrocodex html compiler",
      "frontend html playground",
    ],
    headline: "HTML Online Compiler & Live Preview Code Editor",
    subheadline:
      "Write HTML5 markup and view real-time rendered output in an isolated browser sandbox with live DOM updates and zero local setup.",
    tagline: "Modern HTML5 semantic elements, forms, canvas, and live visual output with sub-millisecond execution.",
    runtimeSpec: {
      engine: "Sandboxed Web Browser Iframe",
      version: "HTML5 W3C Standard",
      timeout: "Instant Client-side",
      memoryLimit: "Client Managed",
      isolation: "Sandboxed Iframe (allow-scripts)",
    },
    features: [
      "Real-time visual rendering inside an isolated browser iframe sandbox",
      "Full HTML5 semantic tag support (<header>, <nav>, <main>, <section>, <article>, <footer>)",
      "Instant DOM manipulation and embedded style/script execution",
      "Responsive mobile and desktop layout testing with one-click refresh",
      "One-click snippet sharing and permanent URL generation",
      "Full Monaco (VS Code) syntax highlighting, code folding, and auto-indentation",
    ],
    useCases: [
      "Testing HTML5 structure, semantic tags, tables, and web forms",
      "University frontend web development coursework & student assignments",
      "Quick prototyping of UI components, landing sections, and email templates",
      "Demonstrating frontend concepts without installing VS Code or local servers",
      "Practicing responsive web design with CSS Flexbox and Grid",
    ],
    faqs: [
      {
        question: "How do I run HTML code online with SkyroCodeX?",
        answer:
          "Type or paste your HTML markup into the Monaco editor. The live preview updates automatically in real-time, or you can click 'Run' to force an immediate refresh. No installation or account is needed.",
      },
      {
        question: "What is an HTML online compiler?",
        answer:
          "An HTML online compiler (or online HTML runner/editor) is a web-based tool that interprets your HTML, CSS, and JavaScript code directly in the browser and displays the live rendered webpage output instantly without requiring a local web server.",
      },
      {
        question: "Can I use CSS and JavaScript inside my HTML code?",
        answer:
          "Yes! You can include inline <style> and <script> tags directly, or click the '+' button in the editor tab bar to add separate styles.css and script.js files to your project.",
      },
      {
        question: "Is this online HTML compiler 100% free to use?",
        answer:
          "Yes, SkyroCodeX HTML Online Compiler is 100% free with unlimited previews, zero sign-in required, and instant snippet sharing for students, developers, and educators.",
      },
      {
        question: "Can I test responsive mobile layouts?",
        answer:
          "Yes! The live preview panel allows you to resize the output viewport, inspect elements, and preview your HTML page exactly as it appears on mobile devices and desktop screens.",
      },
    ],
  },

  css: {
    id: "css",
    name: "CSS3",
    version: "CSS3",
    seoTitle: "CSS Online Compiler - Live CSS3 Style Editor & Preview | SkyroCodeX",
    metaDescription:
      "Free online CSS compiler & live stylesheet editor. Test CSS Flexbox, Grid layouts, keyframe animations, gradients, and responsive styles with instant real-time browser preview.",
    keywords: [
      "css online compiler",
      "online css compiler",
      "css editor online",
      "live css preview",
      "test css in browser",
      "css playground online",
      "flexbox playground online",
      "css grid tester",
      "free css editor online",
      "css runner online",
      "skyrocodex css",
    ],
    headline: "CSS Online Compiler & Live Style Sandbox",
    subheadline:
      "Experiment with modern CSS3 styles, Flexbox, Grid, keyframe animations, and custom properties with instant visual output.",
    tagline: "Modern CSS3 engine with instant live styling, gradients, transitions, and keyframe animations.",
    runtimeSpec: {
      engine: "Live Browser CSSOM Engine",
      version: "CSS3 / Modern CSS",
      timeout: "Instant Client-side",
      memoryLimit: "Client Managed",
      isolation: "Sandboxed Preview",
    },
    features: [
      "Instant visual updates as you type CSS rules, selectors, and variables",
      "Full CSS3 support: Flexbox, CSS Grid, CSS Variables (:root), transforms, and @keyframes animations",
      "Modern color models (hex, rgb, hsl, oklch) and gradient backgrounds",
      "Works seamlessly with HTML markup in multi-tab mode",
      "One-click snippet sharing for sharing stylesheets and animations",
    ],
    useCases: [
      "Prototyping CSS animations, hover effects, and cards",
      "Mastering and debugging Flexbox and CSS Grid layouts",
      "Testing CSS custom properties and color palettes",
      "Sharing isolated CSS bugs and component styles",
    ],
    faqs: [
      {
        question: "How does the live CSS compiler work?",
        answer:
          "As you write CSS in the editor, your styles are dynamically applied to the live preview window in real time, giving you instant visual feedback.",
      },
      {
        question: "Does it support modern CSS like Flexbox, Grid, and @keyframes?",
        answer:
          "Yes! All modern CSS3 features including Flexbox, CSS Grid, custom properties (CSS variables), gradients, and keyframe animations are fully supported.",
      },
      {
        question: "Can I link my CSS to custom HTML?",
        answer:
          "Yes! Click the '+' button in the tab bar to add an index.html file, and your CSS will automatically style that HTML in the live preview.",
      },
    ],
  },

  web: {
    id: "web",
    name: "Web (HTML / CSS / JS)",
    version: "HTML5",
    seoTitle: "HTML CSS JS Online Compiler & Web Preview Editor | SkyroCodeX",
    metaDescription:
      "Free online HTML, CSS & JavaScript compiler with live preview iframe. Multi-tab Monaco editor, instant DOM rendering, and shareable web projects with zero setup.",
    keywords: [
      "html css js online compiler",
      "online html editor",
      "live web preview",
      "html css js sandbox",
      "frontend playground online",
      "codepen alternative free",
      "run html online with css js",
      "web design sandbox in browser",
      "skyrocodex web",
    ],
    headline: "HTML, CSS & JavaScript Online Compiler with Live Preview",
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

