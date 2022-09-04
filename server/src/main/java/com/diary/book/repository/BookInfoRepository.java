package com.diary.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.book.entity.BookInfo;

public interface BookInfoRepository extends JpaRepository<BookInfo, Long> {

}
