package com.diary.book.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ApiBookResponse {
	private String title;
	private String description;
	private String imageUrl;
	private String author;
	private Integer price;
	private String publisher;
	private String isbn;
}
