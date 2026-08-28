package com.pictet.challenge.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import com.pictet.challenge.services.BookService;
import com.pictet.challenge.types.Book;
import com.pictet.challenge.types.Views;
import com.pictet.challenge.types.exceptions.BookAlreadyExists;
import com.pictet.challenge.types.exceptions.InvalidBookException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;


@RestController
@CrossOrigin(origins= "http://localhost:4200") // needed for local testing
public class BooksController {

    @Autowired
    private BookService bookService;

    @GetMapping("/books")
    @JsonView(Views.Summary.class) // To not show everything if all the entity is loaded
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @GetMapping("/books/{bookId}")
    // Ommitting JsonView here for simplicity
    public Book getBook(@PathVariable Integer bookId) {
        try {
            return bookService.getBook(bookId);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Book %d Not Found",bookId),e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage(),e);
        }
    }

    @PostMapping("/books")
    public Book newBook(@RequestBody Book newBook) {
        try {
            return bookService.addBook(newBook);
        } catch (InvalidBookException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage(),e);
        } catch (BookAlreadyExists e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,e.getMessage(),e);
        }
    }
}
