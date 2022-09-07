package com.diary.book.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.book.dto.BookResponse;
import com.diary.book.dto.BookUploadRequest;
import com.diary.book.entity.Book;
import com.diary.book.entity.Book.bookStatus;
import com.diary.book.entity.BookInfo;
import com.diary.book.repository.BookInfoRepository;
import com.diary.book.repository.BookRepository;
import com.diary.common.dto.PageResponse;
import com.diary.member.entity.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookServiceImpl implements BookService {
	private final BookRepository bookRepository;
	private final BookInfoRepository bookInfoRepository;

	/*
	 * 도서 등록
	 */
	@Override
	@Transactional
	public Long setBook(BookUploadRequest request, Long memberId) {
		BookInfo bookInfo = bookInfoRepository.findByIsbn(request.getIsbn())
			.orElseGet(() -> bookInfoRepository.save(BookInfo.from(request)));

		return bookRepository.save(Book.builder()
			.member(Member.builder().id(memberId).build())
			.bookInfo(bookInfo)
			.name(bookInfo.getTitle())
			.page(request.getPage())
			.endPage(request.getEndPage())
			.status(bookStatus.ING)
			.build()).getId();
	}

	/*
	 * 도서 조회
	 */
	@Override
	public PageResponse<BookResponse> getBooks(Boolean status, Pageable pageable) {
		Page<BookResponse> pageInfo;
		if (status) {
			pageInfo = bookRepository.findAllByBookReviewIsNotNull(pageable).map(BookResponse::from);
		} else {
			pageInfo = bookRepository.findAllByBookReviewIsNull(pageable).map(BookResponse::from);
		}
		return PageResponse.<BookResponse>builder()
			.contents(pageInfo.getContent())
			.pageNumber(pageInfo.getNumber())
			.pageSize(pageInfo.getSize())
			.totalPages(pageInfo.getTotalPages())
			.totalElements(pageInfo.getTotalElements())
			.build();
	}

	/*
	 * 도서 상세 조회
	 */
	@Override
	public BookResponse getBook(Long bookId) {
		return bookRepository.findById(bookId)
			.map(BookResponse::from)
			.orElseThrow(() -> new IllegalArgumentException());
	}

}
