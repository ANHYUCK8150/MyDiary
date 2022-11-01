package com.diary.book.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.diary.book.entity.Book;
import com.diary.book.entity.Book.bookStatus;
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
	private int endPage;
	private Integer progress;
	private BookInfoDto bookInfo;
	private MemberResponse member;
	private BookReviewResponse bookReview;
	private List<BookMarkResponse> bookMark;

	@Builder
	private BookResponse(Long id, String name, bookStatus status, int page, int endPage, Integer progress,
		BookInfoDto bookInfo,
		MemberResponse member,
		BookReviewResponse bookReview,
		List<BookMarkResponse> bookMark) {
		this.id = id;
		this.name = name;
		this.status = status;
		this.page = page;
		this.endPage = endPage;
		this.progress = progress;
		this.bookInfo = bookInfo;
		this.member = member;
		this.bookReview = bookReview;
		this.bookMark = bookMark;
	}

	public static BookResponse from(Book book) {
		Integer progress = 0;
		try {
			progress = (int)Math.ceil((double)book.getPage() / (double)book.getEndPage() * 100);
		} catch (Exception e) {
			progress = 0;
		}
		return BookResponse.builder()
			.id(book.getId())
			.name(book.getName())
			.status(book.getStatus())
			.page(book.getPage())
			.endPage(book.getEndPage())
			.progress(progress)
			.bookInfo(BookInfoDto.from(book.getBookInfo()))
			.member(MemberResponse.from(book.getMember()))
			.bookReview(BookReviewResponse.from(book.getBookReview()))
			.bookMark(book.getBookMark().stream().map(BookMarkResponse::from).collect(Collectors.toList()))
			.build();
	}

}
