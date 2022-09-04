package com.diary.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.book.entity.BookReview;

public interface BookReviewRepository extends JpaRepository<BookReview, Long> {

}
