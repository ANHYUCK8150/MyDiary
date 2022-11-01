package com.diary.book.service;

import org.springframework.data.domain.Pageable;

import com.diary.book.dto.BookInfoDto;
import com.diary.book.dto.BookMarkRequest;
import com.diary.book.dto.BookPageRequest;
import com.diary.book.dto.BookResponse;
import com.diary.book.dto.BookReviewUploadRequest;
import com.diary.book.dto.BookUploadRequest;
import com.diary.common.dto.PageResponse;

public interface BookService {

	Long setBook(BookUploadRequest request, Long memberId);

	PageResponse<BookResponse> getBooks(Boolean status, Pageable pageable);

	BookResponse getBook(Long bookId);

	PageResponse<BookResponse> getMemberBooks(Long memberId, Pageable pageable);

	void setBookPage(Long bookId, BookPageRequest request);

	void removeBook(Long bookId);

	PageResponse<BookInfoDto> getESBookInfo(String query, Pageable pageable);

	PageResponse<BookInfoDto> getBookInfo(String query, Pageable pageable);

	Long setBookReview(BookReviewUploadRequest request, Long id);

	Long setBookMarks(BookMarkRequest request, Long bookId, Long id);

	void removeBookMark(Long bookId, Long bookMarkId, Long id);

}
