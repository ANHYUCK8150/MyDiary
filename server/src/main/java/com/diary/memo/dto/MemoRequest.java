package com.diary.memo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemoRequest {
	private Long id;
	private String subject;
	private String content;
	private Long memberId;
	private Long categoryId;
}
