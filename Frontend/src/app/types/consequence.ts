import { ConsequenceType } from "./consequence-type";

export interface Consequence {
  consequenceKey?: number;
  type: ConsequenceType;
  text: string;
  value: number | string;
}


