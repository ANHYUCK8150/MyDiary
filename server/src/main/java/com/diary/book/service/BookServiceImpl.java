package com.diary.book.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.book.dto.BookUploadRequest;
import com.diary.book.entity.Book;
import com.diary.book.entity.Book.bookStatus;
import com.diary.book.entity.BookInfo;
import com.diary.book.repository.BookInfoRepository;
import com.diary.book.repository.BookRepository;
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
			.status(bookStatus.ING)
			.build()).getId();
	}

}
