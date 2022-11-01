package com.diary.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.book.entity.BookMark;

public interface BookMarkRepository extends JpaRepository<BookMark, Long> {

}
