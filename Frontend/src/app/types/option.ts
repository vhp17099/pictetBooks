import { Consequence } from "./consequence";

export interface Option {
  optionKey?: number;
  description: string;
  gotoId: number;
  consequence?: Consequence[];
  subtext?: string;
  requires?: string;
}

