package com.pictet.challenge.services;

import com.pictet.challenge.repositories.BookRepository;
import com.pictet.challenge.types.Book;
import com.pictet.challenge.types.Option;
import com.pictet.challenge.types.Section;
import com.pictet.challenge.types.enums.SectionType;
import com.pictet.challenge.types.exceptions.BookAlreadyExists;
import com.pictet.challenge.types.exceptions.InvalidBookException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService{
    @Autowired
    private BookRepository bookRepository;

    @Override
    @Transactional // Should not be needed here, but on a real DB yes
    public Book getBook(int bookId) {
        Optional<Book> result = bookRepository.findById(bookId);
        if (result.isPresent()) {
            if (result.get().getSections().isEmpty()) { // Should not happen?
                throw new RuntimeException(String.format("Book %d is invalid", bookId));
            }
            return result.get();
        } else {
            throw new NoSuchElementException(String.format("Book %d Not Found", bookId));
        }
    }

    @Override
    public Book addBook(Book book) throws InvalidBookException, BookAlreadyExists {
        if (bookRepository.findOneByTitle(book.getTitle()).isPresent()) {
            throw new BookAlreadyExists(String.format("Book %s already exists", book.getTitle()));
        }

        if (!isBookValid(book)) {
            throw new InvalidBookException(String.format("Book %s is invalid.", book.getTitle()));
        }

        return bookRepository.save(book);
    }

    public List<Book> getBooks() {
        return (List<Book>)bookRepository.findAll();
    }

    /*
       To be valid a book needs:
       - only one beginning
       - must at least have one ending
       - all Section gotoId must have a valid target
       - all non Ending sections must have options
     */
    private boolean isBookValid(Book book) {
        boolean beginning = false;
        boolean ending = false;
        List<Section>  sections = book.getSections();
        HashSet<Integer> sectionKeys = new HashSet<>(); // All section Ids on Hashset for quick check
        sections.forEach(section -> sectionKeys.add(section.getId()));

        for ( Section s : sections) {
            if(s.getType() == SectionType.BEGIN) {
                if (beginning) {
                    return false; // Can't have two beginnings
                } else {
                    beginning = true; // Found one beginning
                }
            }

            if (s.getType() == SectionType.END) {
                ending = true; // Found an ending
            } else {
                if (s.getOptions().isEmpty()) {
                    return false; // Non ending section needs options!
                }
                // Check all options GotoId
                for ( Option o :  s.getOptions()) {
                    if (!sectionKeys.contains(o.getGotoId())) {
                        return false; // GotoId does not exist!
                    }
                }
            }
        }

        // If we got outside the Section cycle, everything went well, just check if we have an ending!
        return ending;
    }
}
