// src/types/papaparse.d.ts
declare module "papaparse" {
  export function parse(
    input: string,
    config: {
      header?: boolean;
      dynamicTyping?: boolean;
      skipEmptyLines?: boolean;
      complete?: (results: { data: any[]; errors: any[]; meta: any }) => void;
      error?: (error: any) => void;
    }
  ): void;
}
