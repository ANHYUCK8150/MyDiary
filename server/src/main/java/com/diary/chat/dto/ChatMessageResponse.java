package com.diary.chat.dto;

import java.time.LocalDateTime;

import com.diary.chat.entity.ChatMessage;
import com.diary.chat.entity.ChatMessage.messageType;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatMessageResponse {
	private Long id;
	private String message;
	private messageType type;
	private ChatMemberResponse member;
	private LocalDateTime sendDate;

	@Builder
	private ChatMessageResponse(Long id, String message, messageType type, ChatMemberResponse member,
		LocalDateTime sendDate) {
		this.id = id;
		this.message = message;
		this.type = type;
		this.member = member;
		this.sendDate = sendDate;
	}

	public static ChatMessageResponse from(ChatMessage chatMessage) {
		return ChatMessageResponse.builder()
			.id(chatMessage.getId())
			.message(chatMessage.getMessage())
			.type(chatMessage.getType())
			.member(ChatMemberResponse.from(chatMessage.getChatMember()))
			.sendDate(chatMessage.getCreatedDate())
			.build();
	}

}
