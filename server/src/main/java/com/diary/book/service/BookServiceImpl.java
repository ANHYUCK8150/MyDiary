package com.diary.book.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.book.dto.BookInfoDto;
import com.diary.book.dto.BookPageRequest;
import com.diary.book.dto.BookResponse;
import com.diary.book.dto.BookReviewUploadRequest;
import com.diary.book.dto.BookUploadRequest;
import com.diary.book.entity.Book;
import com.diary.book.entity.Book.bookStatus;
import com.diary.book.entity.BookInfo;
import com.diary.book.entity.BookReview;
import com.diary.book.repository.BookInfoESRepository;
import com.diary.book.repository.BookInfoRepository;
import com.diary.book.repository.BookRepository;
import com.diary.common.dto.PageResponse;
import com.diary.member.entity.Member;
import com.diary.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookServiceImpl implements BookService {
	private final BookRepository bookRepository;
	private final BookInfoRepository bookInfoRepository;
	private final BookInfoESRepository bookInfoESRepository;

	private final MemberRepository memberRepository;

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

	/*
	 * 맴버 도서 조회
	 */
	@Override
	public PageResponse<BookResponse> getMemberBooks(Long memberId, Pageable pageable) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new IllegalArgumentException());

		Page<BookResponse> pageInfo = bookRepository.findAllByMember(member, pageable).map(BookResponse::from);

		return PageResponse.<BookResponse>builder()
			.contents(pageInfo.getContent())
			.pageNumber(pageInfo.getNumber())
			.pageSize(pageInfo.getSize())
			.totalPages(pageInfo.getTotalPages())
			.totalElements(pageInfo.getTotalElements())
			.build();
	}

	/*
	 * 도서 읽은 페이지 마지막 페이지 수정
	 */
	@Override
	@Transactional
	public void setBookPage(Long bookId, BookPageRequest request) {

		bookRepository.save(bookRepository.findById(bookId)
			.orElseThrow(() -> new IllegalArgumentException()).updatePage(request.getPage(), request.getEndPage()));

	}

	/*
	 * 도서 삭제
	 */
	@Override
	@Transactional
	public void removeBook(Long bookId) {
		bookRepository.deleteById(bookId);
	}

	/*
	 * 도서 내부 조회(Elasticsearch)
	 */
	@Override
	public PageResponse<BookInfoDto> getESBookInfo(String query, Pageable pageable) {
		Page<BookInfoDto> pageInfo = bookInfoESRepository.searchByTitleContains(query, pageable).map(BookInfoDto::from);

		return PageResponse.<BookInfoDto>builder()
			.contents(pageInfo.getContent())
			.pageNumber(pageInfo.getNumber())
			.pageSize(pageInfo.getSize())
			.totalPages(pageInfo.getTotalPages())
			.totalElements(pageInfo.getTotalElements())
			.build();
	}

	/*
	 * 도서 내부 조회
	 */
	@Override
	public PageResponse<BookInfoDto> getBookInfo(String query, Pageable pageable) {
		Page<BookInfoDto> pageInfo = bookInfoRepository.findByTitleContains(query, pageable).map(BookInfoDto::from);

		return PageResponse.<BookInfoDto>builder()
			.contents(pageInfo.getContent())
			.pageNumber(pageInfo.getNumber())
			.pageSize(pageInfo.getSize())
			.totalPages(pageInfo.getTotalPages())
			.totalElements(pageInfo.getTotalElements())
			.build();
	}

	/*
	 * 도서 리뷰 등록
	 */
	@Override
	@Transactional
	public Long setBookReview(BookReviewUploadRequest request, Long id) {
		Book book = bookRepository.findById(request.getBookId())
			.orElseThrow(() -> new IllegalArgumentException());

		BookReview bookReview = BookReview.builder()
			.id(request.getReviewId())
			.content(request.getContent())
			.rating(request.getRating())
			.build();

		book.addReview(bookReview);

		return bookRepository.save(book).getId();
	}

}
