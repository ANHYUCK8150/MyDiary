package com.diary.book.dto;

import com.diary.book.entity.BookMark;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookMarkResponse {
	private Long id;
	private String title;
	private String content;

	@Builder
	private BookMarkResponse(Long id, String title, String content) {
		this.id = id;
		this.title = title;
		this.content = content;
	}

	public static BookMarkResponse from(BookMark bookMark) {
		if (bookMark == null) {
			return null;
		}
		return BookMarkResponse.builder()
			.id(bookMark.getId())
			.title(bookMark.getTitle())
			.content(bookMark.getContent())
			.build();
	}
}
