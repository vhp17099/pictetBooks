import { Injectable } from '@angular/core';
import { BookView } from '../../types/book-view';
import { Book } from '../../types/book';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    baseUrl = 'http://localhost:8080/';
    bookServiceEndpoint = 'books';

  async getBooks(): Promise<BookView[]> {
    try{
        const response = await fetch(this.baseUrl+this.bookServiceEndpoint);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status:${response.status}`);
        }
        return (await response.json()) ?? [];
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
  }

  async getBook(id: number): Promise<Book> {
    try{
        const response = await fetch(this.baseUrl+this.bookServiceEndpoint+"/"+id);
        if(!response.ok) {
            throw new Error(`HTTP Error! Status:${response.status}`);
        }
        return (await response.json()) ?? undefined;
    } catch (error) {
        console.error('Error fetching book ${id}:', error);
        throw error;
    }
  }
}