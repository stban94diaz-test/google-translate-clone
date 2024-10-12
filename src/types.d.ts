import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "./constants";

export interface State {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  result: string;
  loading: boolean;
}

export type Action =
  | { type: 'INTERCHANGE_LANGUAGE' }
  | { type: 'SET_FROM_LANGUAGE', payload: FromLanguage }
  | { type: 'SET_TO_LANGUAGE', payload: Language }
  | { type: 'SET_FROM_TEXT', payload: string }
  | { type: 'TRANSLATE_TEXT', payload: string }

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

export enum SelectionType {
  FROM = 'from',
  TO = 'to',
}
