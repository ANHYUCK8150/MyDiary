package com.diary.book.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookMarkRequest {
	private Long bookId;
	private Long id;
	private String title;
	private String content;
}
