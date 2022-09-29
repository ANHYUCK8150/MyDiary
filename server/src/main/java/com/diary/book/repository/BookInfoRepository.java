package com.diary.book.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.book.entity.BookInfo;

public interface BookInfoRepository extends JpaRepository<BookInfo, Long> {

	Optional<BookInfo> findByIsbn(String isbn);

	Page<BookInfo> findByTitleContains(String query, Pageable pageable);

}
