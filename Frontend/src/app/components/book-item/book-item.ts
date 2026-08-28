import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookView } from '../../types/book-view';
import { BookDifficulty } from '../../types/book-difficulty';

@Component({
  imports: [RouterLink],
  selector: 'app-book-item',
  styleUrl: './book-item.css',
  templateUrl: './book-item.html',
})
export class BookItem {
  bookView = input.required<BookView>();

  difficultyStyle = computed(() => {
    const diff = (this.bookView().difficulty ?? '').toUpperCase();
    switch (diff) {
      case BookDifficulty.EASY:
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case BookDifficulty.MEDIUM:
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case BookDifficulty.HARD:
        return 'bg-red-50 text-red-800 border-red-200';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  });


  formattedDifficulty = computed(() => {
    const diff = this.bookView().difficulty ?? '';
    if (!diff) return '';
    return diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase();
  });
}

