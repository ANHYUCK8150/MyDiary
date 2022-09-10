package com.diary.book.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookPageRequest {
	private Integer page;
	private Integer endPage;
}
