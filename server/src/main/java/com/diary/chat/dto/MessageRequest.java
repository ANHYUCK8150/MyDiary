package com.diary.chat.dto;

import com.diary.chat.entity.ChatMessage.messageType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MessageRequest {
	private Long roomId;
	private Long memberId;
	private String message;
	private messageType type;
}
