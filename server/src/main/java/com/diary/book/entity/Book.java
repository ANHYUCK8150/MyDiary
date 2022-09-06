package com.diary.book.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.ColumnDefault;

import com.diary.common.entity.BaseTimeEntity;
import com.diary.member.entity.Member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Book extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@Enumerated(EnumType.STRING)
	@ColumnDefault("'ING'")
	private bookStatus status = bookStatus.ING;

	@ColumnDefault("1")
	private int page = 1;

	@ColumnDefault("1")
	private int endPage = 1;

	@ManyToOne
	@JoinColumn(name = "book_info_id", nullable = true)
	private BookInfo bookInfo;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToOne
	@JoinColumn(name = "book_review_id", nullable = true)
	private BookReview bookReview;

	@Builder
	private Book(Long id, String name, bookStatus status, int page, int endPage, BookInfo bookInfo, Member member,
		BookReview bookReview) {
		this.id = id;
		this.name = name;
		this.status = status;
		this.page = page;
		this.endPage = endPage;
		this.bookInfo = bookInfo;
		this.member = member;
		this.bookReview = bookReview;
	}

	public enum bookStatus {
		ING, ON
	}
}
