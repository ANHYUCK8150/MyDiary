package com.diary.book.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.diary.book.dto.BookInfoDto;
import com.diary.book.dto.BookResponse;
import com.diary.book.dto.BookUploadRequest;
import com.diary.book.service.BookApiService;
import com.diary.book.service.BookService;
import com.diary.common.dto.PageResponse;
import com.diary.common.entity.CurrentUser;
import com.diary.common.entity.UserPrincipal;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

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

	@ApiOperation(value = "도서 등록")
	@PostMapping("/books")
	public ResponseEntity<Long> setBook(
		@RequestBody
		BookUploadRequest request,
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal) {
		return ResponseEntity.ok(bookService.setBook(request, userPrincipal.getId()));
	}

	@ApiOperation(value = "도서 조회")
	@GetMapping("/books")
	public ResponseEntity<PageResponse<BookResponse>> getBooks(
		@RequestParam
		Boolean status,
		Pageable pageable) {
		return ResponseEntity.ok(bookService.getBooks(status, pageable));
	}

	@ApiOperation(value = "유저 도서 조회")
	@GetMapping("/users/{memberId}/books")
	public ResponseEntity<PageResponse<BookResponse>> getMemberBooks(
		@PathVariable
		Long memberId,
		Pageable pageable) {
		return ResponseEntity.ok(bookService.getMemberBooks(memberId, pageable));
	}

	@ApiOperation(value = "도서 상세 조회")
	@GetMapping("/books/{bookId}")
	public ResponseEntity<BookResponse> getBook(
		@PathVariable
		Long bookId) {
		return ResponseEntity.ok(bookService.getBook(bookId));
	}
}
