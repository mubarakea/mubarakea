// typings/react-native-tesseract-ocr.d.ts
declare module 'react-native-tesseract-ocr' {
    export interface TesseractOptions {
      whitelist?: string;
      blacklist?: string;
    }
  
    export default class RNTesseractOcr {
      /**
       * Recognize text in the image at `path` using the given language (e.g. 'ENG', 'ARA').
       * @param path local file path or URI
       * @param lang language code
       * @param options optional whitelist/blacklist
       * @returns recognized text
       */
      static recognize(
        path: string,
        lang: string,
        options?: TesseractOptions
      ): Promise<string>;
    }
  }
  