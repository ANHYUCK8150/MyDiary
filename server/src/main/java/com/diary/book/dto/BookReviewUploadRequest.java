package com.diary.book.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookReviewUploadRequest {
	private Long bookId;
	private Double rating;
	private String content;
}
