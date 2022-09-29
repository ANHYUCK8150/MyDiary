package com.diary.book.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.elasticsearch.annotations.Document;

import com.diary.book.dto.BookUploadRequest;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Document(indexName = "book_info")
@Entity
@Getter
@NoArgsConstructor
public class BookInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;

	@Column(columnDefinition = "TEXT")
	private String description;

	private String imageUrl;

	private String author;

	private Integer price;

	private String publisher;

	private String isbn;

	@Builder
	private BookInfo(Long id, String title, String description, String imageUrl,
		String author, Integer price, String publisher, String isbn) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.imageUrl = imageUrl;
		this.author = author;
		this.price = price;
		this.publisher = publisher;
		this.isbn = isbn;
	}

	public static BookInfo from(BookUploadRequest request) {
		return BookInfo.builder()
			.author(request.getAuthor())
			.description(request.getDescription())
			.imageUrl(request.getImageUrl())
			.isbn(request.getIsbn())
			.price(request.getPrice())
			.publisher(request.getPublisher())
			.title(request.getTitle())
			.build();
	}

}
