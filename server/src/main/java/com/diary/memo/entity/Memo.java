package com.diary.memo.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.diary.common.entity.BaseTimeEntity;
import com.diary.member.entity.Member;
import com.diary.memo.dto.MemoDto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Memo extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String subject;

	@Column(columnDefinition = "TEXT")
	private String content;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne
	@JoinColumn(name = "memo_category_id")
	private MemoCategory category;

	@Builder
	public Memo(Long id, String subject, String content, Member member,
		MemoCategory category) {
		this.id = id;
		this.subject = subject;
		this.content = content;
		this.member = member;
		this.category = category;
	}

	public static Memo from(MemoDto memoDto) {
		return Memo.builder()
			.id(memoDto.getId())
			.subject(memoDto.getSubject())
			.content(memoDto.getContent())
			.member(Member.from(memoDto.getMember()))
			.category(memoDto.getCategory())
			.build();
	}

}
