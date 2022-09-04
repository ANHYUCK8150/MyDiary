package com.diary.book.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.diary.common.entity.BaseTimeEntity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class BookInfo extends BaseTimeEntity implements Serializable {
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

}
