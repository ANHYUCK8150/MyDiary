package com.diary.chat.dto;

import com.diary.chat.entity.ChatMember;
import com.diary.member.dto.MemberResponse;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatMemberResponse {
	private Long id;
	private MemberResponse member;
	private Integer notReadMessage;

	@Builder
	private ChatMemberResponse(Long id, MemberResponse member, Integer notReadMessage) {
		this.id = id;
		this.member = member;
		this.notReadMessage = notReadMessage;
	}

	public static ChatMemberResponse from(ChatMember chatMember) {
		if (chatMember == null) {
			return new ChatMemberResponse();
		}
		return ChatMemberResponse.builder()
			.id(chatMember.getId())
			.member(MemberResponse.from(chatMember.getMember()))
			.notReadMessage(chatMember.getNotReadMessage())
			.build();
	}

}
