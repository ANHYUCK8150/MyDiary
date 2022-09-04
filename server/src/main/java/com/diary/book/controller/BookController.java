package com.diary.book.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.book.dto.ApiBookResponse;
import com.diary.book.service.BookService;
import com.diary.common.dto.PageResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Api(value = "/api/v1/book", description = "도서 API")
@RequestMapping("/api/v1")
public class BookController {
	private final BookService bookService;

	@ApiOperation(value = "도서 API 조회")
	@GetMapping("/books/api/{query}")
	public ResponseEntity<PageResponse<ApiBookResponse>> getApiBookInfo(
		@PathVariable
		String query,
		Pageable pageable) {
		return ResponseEntity.ok(null);
	}
}
