package com.diary.book.service;

import com.diary.book.dto.BookUploadRequest;

public interface BookService {

	Long setBook(BookUploadRequest request, Long memberId);

}
