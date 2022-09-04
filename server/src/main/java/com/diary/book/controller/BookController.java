package com.diary.book.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.diary.book.dto.BookInfoDto;
import com.diary.book.service.BookApiService;
import com.diary.book.service.BookService;
import com.diary.common.dto.PageResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Api(value = "/api/v1/books", description = "도서 API")
@RequestMapping("/api/v1")
public class BookController {
	private final BookService bookService;
	private final BookApiService bookApiService;

	@ApiOperation(value = "도서 API 조회")
	@GetMapping("/books/api")
	public ResponseEntity<PageResponse<BookInfoDto>> getApiBookInfo(
		@RequestParam
		String query,
		@RequestParam
		int page) {
		return ResponseEntity.ok(bookApiService.search(query, page));
	}
}
