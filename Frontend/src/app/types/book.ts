import { BookView } from "./book-view";
import { Section } from "./section";

export interface Book extends BookView {
    sections: Section[],
}