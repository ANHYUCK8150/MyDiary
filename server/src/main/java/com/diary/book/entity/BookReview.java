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
public class BookReview extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private double rating;

	@Column(columnDefinition = "TEXT")
	private String content;

	@Builder
	public BookReview(Long id, double rating, String content) {
		this.id = id;
		this.rating = rating;
		this.content = content;
	}

}
