import { ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { BookItem } from '../book-item/book-item';
import { BookView } from '../../types/book-view';
import { BookService } from '../../service/bookService/book-service';

@Component({
  imports: [BookItem],
  selector: 'app-book-list',
  styleUrl: './book-list.css',
  templateUrl: './book-list.html',
})
export class BookList {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  bookService: BookService = inject(BookService);

  bookList: BookView[] = [];
  filteredBookList: BookView[] = [];
  searchTerm: string = "";

  constructor() {
    this.bookService
      .getBooks()
      .then((serviceResult: BookView[]) => {
        this.bookList = serviceResult;
        this.filteredBookList = serviceResult;
        this.changeDetectorRef.markForCheck();
      });
  }

  filterResult(term?: string) {
    if(!!term) {
      this.searchTerm = term.trim();
    } else {
      this.searchTerm = "";
    }

    if(!this.searchTerm || this.searchTerm.length == 0) {
      this.filteredBookList = this.bookList;
      return;
    }
    this.filteredBookList = this.bookList.filter((bookView) => 
      bookView?.title.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }
}
