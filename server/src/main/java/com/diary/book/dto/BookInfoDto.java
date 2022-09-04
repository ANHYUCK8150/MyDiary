package com.diary.book.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BookInfoDto {
	private String title;
	private String description;
	private String imageUrl;
	private String author;
	private Integer price;
	private String publisher;
	private String isbn;

	@Builder
	private BookInfoDto(String title, String description, String imageUrl, String author, Integer price,
		String publisher, String isbn) {
		this.title = title;
		this.description = description;
		this.imageUrl = imageUrl;
		this.author = author;
		this.price = price;
		this.publisher = publisher;
		this.isbn = isbn;
	}

	public static BookInfoDto from(ApiNaverBookItemResponse response) {
		return BookInfoDto.builder()
			.title(response.getTitle())
			.description(response.getDescription())
			.imageUrl(response.getImageUrl())
			.author(response.getAuthor())
			.price(response.getPrice())
			.publisher(response.getPublisher())
			.isbn(response.getIsbn())
			.build();
	}

}
