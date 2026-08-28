package com.pictet.challenge.services;

import com.pictet.challenge.types.Book;
import com.pictet.challenge.types.exceptions.BookAlreadyExists;
import com.pictet.challenge.types.exceptions.InvalidBookException;

import java.util.List;

public interface BookService {
    Book getBook(int bookId);
    Book addBook(Book book) throws InvalidBookException, BookAlreadyExists;

    List<Book> getBooks();
}