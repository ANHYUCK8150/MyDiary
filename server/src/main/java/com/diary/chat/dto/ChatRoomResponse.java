package com.diary.chat.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.diary.chat.entity.ChatRoom;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomResponse {
	private Long id;
	private String lastMessage;
	private LocalDateTime modifiedDate;
	private List<ChatMemberResponse> members = new ArrayList<>();
	private ChatMemberResponse another;

	@Builder
	private ChatRoomResponse(Long id, String lastMessage, LocalDateTime modifiedDate,
		List<ChatMemberResponse> members, ChatMemberResponse another) {
		this.id = id;
		this.lastMessage = lastMessage;
		this.modifiedDate = modifiedDate;
		this.members = members;
		this.another = another;
	}

	public static ChatRoomResponse from(ChatRoom chatRoom, Long memberId) {
		return ChatRoomResponse.builder()
			.id(chatRoom.getId())
			.lastMessage(chatRoom.getLastMessage())
			.modifiedDate(chatRoom.getModifiedDate())
			.members(chatRoom.getMember().stream()
				.map(ChatMemberResponse::from)
				.collect(Collectors.toList()))
			.another(ChatMemberResponse
				.from(chatRoom.getMember().stream().filter(member -> !member.getMember().getId().equals(memberId))
					.findFirst().orElse(null)))
			.build();
	}

}
