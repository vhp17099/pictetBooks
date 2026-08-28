import { BookDifficulty } from "./book-difficulty";

export interface BookView {
  id: number;
  title: string;
  author: string;
  difficulty: BookDifficulty;
}

