package com.diary.book.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.diary.common.entity.BaseTimeEntity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class BookMark extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;

	private String content;

	@ManyToOne
	@JoinColumn(name = "book_id")
	private Book book;

	@Builder
	public BookMark(Long id, String title, String content, Book book) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.book = book;
	}

}
