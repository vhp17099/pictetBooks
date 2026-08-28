import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { BookService } from './service/bookService/book-service';
import { BookView } from './types/book-view';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
    bookService: BookService = inject(BookService);
    
    bookList: BookView[] = [];
    
    constructor() {
      this.bookService
        .getBooks()
        .then((serviceResult: BookView[]) => {
          this.bookList = serviceResult;
        });
    }
}

