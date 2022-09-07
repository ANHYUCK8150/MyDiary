package com.diary.book.service;

import org.springframework.data.domain.Pageable;

import com.diary.book.dto.BookResponse;
import com.diary.book.dto.BookUploadRequest;
import com.diary.common.dto.PageResponse;

public interface BookService {

	Long setBook(BookUploadRequest request, Long memberId);

	PageResponse<BookResponse> getBooks(Boolean status, Pageable pageable);

	BookResponse getBook(Long bookId);

}
