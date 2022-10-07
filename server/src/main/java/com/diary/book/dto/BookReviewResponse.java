package com.diary.book.dto;

import com.diary.book.entity.BookReview;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookReviewResponse {
	private Long id;
	private Double rating;
	private String content;

	@Builder
	private BookReviewResponse(Long id, Double rating, String content) {
		this.id = id;
		this.rating = rating;
		this.content = content;
	}

	public static BookReviewResponse from(BookReview bookReview) {
		if (bookReview == null) {
			return null;
		}

		return BookReviewResponse.builder()
			.id(bookReview.getId())
			.content(bookReview.getContent())
			.rating(bookReview.getRating())
			.build();
	}

}
