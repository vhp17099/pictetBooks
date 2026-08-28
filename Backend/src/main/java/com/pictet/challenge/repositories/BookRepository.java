package com.pictet.challenge.repositories;

import com.pictet.challenge.types.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends CrudRepository<Book, Integer> {
    Optional<Book> findOneByTitle(String title);
}
