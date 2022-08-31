package com.diary.chat.dto;

import java.time.LocalDateTime;

import com.diary.chat.entity.ChatMember;
import com.diary.chat.entity.ChatMessage;
import com.diary.chat.entity.ChatMessage.messageType;
import com.diary.member.entity.Member;

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

	public static ChatMessageResponse from(MessageRequest request) {
		ChatMember chatMember = ChatMember.builder()
			.member(
				Member.builder()
					.id(request.getMemberId())
					.name(request.getName())
					.imageUrl(request.getImageUrl())
					.build())
			.build();
		return ChatMessageResponse.builder()
			.message(request.getMessage())
			.type(request.getType())
			.member(ChatMemberResponse.from(chatMember))
			.sendDate(LocalDateTime.now())
			.build();
	}

}
