package com.diary.memo.dto;

import java.time.LocalDateTime;

import com.diary.member.dto.MemberResponse;
import com.diary.memo.entity.Memo;
import com.diary.memo.entity.MemoCategory;

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
	private MemoCategory category;
	private LocalDateTime createdDate;

	@Builder
	private MemoResponse(Long id, String subject, String content, MemberResponse member, MemoCategory category,
		LocalDateTime createdDate) {
		this.id = id;
		this.subject = subject;
		this.content = content;
		this.member = member;
		this.category = category;
		this.createdDate = createdDate;
	}

	public static MemoResponse from(Memo memo) {
		return MemoResponse.builder()
			.id(memo.getId())
			.subject(memo.getSubject())
			.content(memo.getContent())
			.member(MemberResponse.from(memo.getMember()))
			.category(memo.getCategory())
			.createdDate(memo.getCreatedDate())
			.build();
	}

}
