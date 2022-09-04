package com.diary.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.book.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
