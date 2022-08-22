package com.diary.memo.dto;

import java.time.LocalDateTime;

import com.diary.member.dto.MemberResponse;
import com.diary.memo.entity.Memo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemoResponse {
	private Long id;
	private String subject;
	private String content;
	private MemberResponse member;
	private String categoryName;
	private LocalDateTime createdDate;

	@Builder
	private MemoResponse(Long id, String subject, String content, MemberResponse member, String categoryName,
		LocalDateTime createdDate) {
		this.id = id;
		this.subject = subject;
		this.content = content;
		this.member = member;
		this.categoryName = categoryName;
		this.createdDate = createdDate;
	}

	public static MemoResponse from(Memo memo) {
		return MemoResponse.builder()
			.id(memo.getId())
			.subject(memo.getSubject())
			.content(memo.getContent())
			.member(MemberResponse.from(memo.getMember()))
			.categoryName(memo.getCategory().getName())
			.createdDate(memo.getCreatedDate())
			.build();
	}

}
