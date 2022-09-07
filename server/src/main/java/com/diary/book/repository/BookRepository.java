package com.diary.book.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.book.entity.Book;
import com.diary.member.entity.Member;

public interface BookRepository extends JpaRepository<Book, Long> {

	Page<Book> findAllByBookReviewIsNotNull(Pageable pageable);

	Page<Book> findAllByBookReviewIsNull(Pageable pageable);

	Page<Book> findAllByMember(Member member, Pageable pageable);
}
