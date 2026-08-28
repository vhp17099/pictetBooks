import { Option } from "./option";
import { SectionType } from "./section-type";

export interface Section {
  sectionKey?: number;
  id: number;
  title?: string;
  text: string;
  type: SectionType;
  options?: Option[];
}
