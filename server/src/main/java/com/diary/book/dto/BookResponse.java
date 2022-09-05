package com.diary.book.dto;

import com.diary.book.entity.Book;
import com.diary.book.entity.Book.bookStatus;
import com.diary.book.entity.BookReview;
import com.diary.member.dto.MemberResponse;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookResponse {
	private Long id;
	private String name;
	private bookStatus status;
	private int page;
	private BookInfoDto bookInfo;
	private MemberResponse member;
	private BookReview bookReview;

	@Builder
	private BookResponse(Long id, String name, bookStatus status, int page, BookInfoDto bookInfo, MemberResponse member,
		BookReview bookReview) {
		this.id = id;
		this.name = name;
		this.status = status;
		this.page = page;
		this.bookInfo = bookInfo;
		this.member = member;
		this.bookReview = bookReview;
	}

	public static BookResponse from(Book book) {
		return BookResponse.builder()
			.id(book.getId())
			.name(book.getName())
			.status(book.getStatus())
			.page(book.getPage())
			.bookInfo(BookInfoDto.from(book.getBookInfo()))
			.member(MemberResponse.from(book.getMember()))
			.build();
	}

}
