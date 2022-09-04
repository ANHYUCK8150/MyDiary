package com.diary.book.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ApiNaverBookItemResponse {
	@JsonProperty("title")
	private String title;

	@JsonProperty("description")
	private String description;

	@JsonProperty("image")
	private String imageUrl;

	@JsonProperty("author")
	private String author;

	@JsonProperty("price")
	private Integer price;

	@JsonProperty("publisher")
	private String publisher;

	@JsonProperty("isbn")
	private String isbn;

}
