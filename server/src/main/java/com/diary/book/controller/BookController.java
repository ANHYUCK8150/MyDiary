package com.diary.book.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.diary.book.dto.BookInfoDto;
import com.diary.book.dto.BookMarkRequest;
import com.diary.book.dto.BookPageRequest;
import com.diary.book.dto.BookResponse;
import com.diary.book.dto.BookReviewUploadRequest;
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

	@ApiOperation(value = "도서 내부 조회(elasticsearch)")
	@GetMapping("/books/elasticsearch")
	public ResponseEntity<PageResponse<BookInfoDto>> getESBookInfo(
		@RequestParam
		String query,
		Pageable pageable) {
		return ResponseEntity.ok(bookService.getESBookInfo(query, pageable));
	}

	@ApiOperation(value = "도서 내부 조회")
	@GetMapping("/books/search")
	public ResponseEntity<PageResponse<BookInfoDto>> getBookInfo(
		@RequestParam
		String query,
		Pageable pageable) {
		return ResponseEntity.ok(bookService.getBookInfo(query, pageable));
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

	@ApiOperation(value = "도서 페이지 수정")
	@PutMapping("/books/{bookId}")
	public ResponseEntity<BookResponse> setBookPage(
		@PathVariable
		Long bookId,
		@RequestBody
		BookPageRequest request) {

		bookService.setBookPage(bookId, request);

		return ResponseEntity
			.status(HttpStatus.NO_CONTENT)
			.build();
	}

	@ApiOperation(value = "도서 삭제")
	@DeleteMapping("/books/{bookId}")
	public ResponseEntity<BookResponse> removeBook(
		@PathVariable
		Long bookId) {

		bookService.removeBook(bookId);

		return ResponseEntity
			.status(HttpStatus.NO_CONTENT)
			.build();
	}

	@ApiOperation(value = "도서 리뷰 등록")
	@PostMapping("/books/{bookId}/reviews")
	public ResponseEntity<Long> setBookReview(
		@RequestBody
		BookReviewUploadRequest request,
		@PathVariable
		Long bookId,
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal) {

		request.setBookId(bookId);

		return ResponseEntity.ok(bookService.setBookReview(request, userPrincipal.getId()));
	}

	@ApiOperation(value = "책갈피 등록")
	@PostMapping("/books/{bookId}/bookmarks")
	public ResponseEntity<Long> setBookMarks(
		@RequestBody
		BookMarkRequest request,
		@PathVariable
		Long bookId,
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal) {

		return ResponseEntity.ok(bookService.setBookMarks(request, bookId, userPrincipal.getId()));
	}

	@ApiOperation(value = "책갈피 수정")
	@PutMapping("/books/{bookId}/bookmarks")
	public ResponseEntity<Long> updateBookMarks(
		@RequestBody
		BookMarkRequest request,
		@PathVariable
		Long bookId,
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal) {

		return ResponseEntity.ok(bookService.setBookMarks(request, bookId, userPrincipal.getId()));
	}

	@ApiOperation(value = "책갈피 삭제")
	@PutMapping("/books/{bookId}/bookmarks/{bookMarkId}")
	public ResponseEntity<Long> deleteBookMarks(
		@PathVariable("bookId")
		Long bookId,
		@PathVariable("bookMarkId")
		Long bookMarkId,
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal) {

		bookService.removeBookMark(bookId, bookMarkId, userPrincipal.getId());

		return ResponseEntity
			.status(HttpStatus.NO_CONTENT)
			.build();
	}
}
