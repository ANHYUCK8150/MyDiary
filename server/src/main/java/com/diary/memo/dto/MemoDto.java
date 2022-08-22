package com.diary.memo.dto;

import com.diary.member.dto.MemberDto;
import com.diary.memo.entity.MemoCategory;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemoDto {
	private Long id;
	private String subject;
	private String content;
	private MemberDto member;
	private MemoCategory category;

	@Builder
	private MemoDto(Long id, String subject, String content, MemberDto member, MemoCategory category) {
		this.id = id;
		this.subject = subject;
		this.content = content;
		this.member = member;
		this.category = category;
	}

	public static MemoDto from(MemoRequest memoRequest) {
		return MemoDto.builder()
			.id(memoRequest.getId())
			.subject(memoRequest.getSubject())
			.content(memoRequest.getContent())
			.member(MemberDto.builder().id(memoRequest.getMemberId()).build())
			.category(MemoCategory.builder().id(memoRequest.getCategoryId()).build())
			.build();
	}

}
