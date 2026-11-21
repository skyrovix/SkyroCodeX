export type SupportedLanguage =
  | "python"
  | "javascript"
  | "html"
  | "css"
  | "java"
  | "c"
  | "cpp"
  | "go"
  | "php"
  | "sql"
  | "web";

export interface LanguageFile {
  name: string;
  language: string;
  content: string;
}

export interface LanguageConfig {
  id: SupportedLanguage;
  name: string;
  version: string;
  monacoLang: string;
  fileExtension: string;
  defaultFileName: string;
  isWebPreview?: boolean;
  files?: LanguageFile[];
  starterCode: string;
  pistonRuntime?: {
    language: string;
    version: string;
  };
  judge0Id?: number;
}

