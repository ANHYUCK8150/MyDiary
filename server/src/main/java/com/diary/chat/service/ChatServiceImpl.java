package com.diary.chat.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.chat.dto.ChatMessageResponse;
import com.diary.chat.dto.ChatRoomResponse;
import com.diary.chat.dto.MessageRequest;
import com.diary.chat.entity.ChatMember;
import com.diary.chat.entity.ChatMessage;
import com.diary.chat.entity.ChatMessage.messageType;
import com.diary.chat.entity.ChatRoom;
import com.diary.chat.repository.ChatMemberRepository;
import com.diary.chat.repository.ChatMessageRepository;
import com.diary.chat.repository.ChatRoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatServiceImpl implements ChatService {
	private final ChatRoomRepository chatRoomRepository;
	private final ChatMessageRepository chatMessageRepository;
	private final ChatMemberRepository chatMemberRepository;

	@Override
	public List<ChatRoomResponse> getRoomList(Long memberId) {
		return chatRoomRepository.findAll().stream()
			.map(room -> ChatRoomResponse.from(room, memberId))
			.collect(Collectors.toList());

	}

	@Override
	public List<ChatMessageResponse> getMessages(Long roomId) {
		return chatMessageRepository.findAllByChatRoomId(roomId).stream()
			.map(ChatMessageResponse::from)
			.collect(Collectors.toList());
	}

	@Override
	@Transactional
	public ChatMessageResponse sendMessage(MessageRequest request, List<Long> memberList) {
		//TEXT, IMAGE 구분
		String lastMessage = request.getMessage();

		if (request.getType().equals(messageType.IMAGE)) {
			lastMessage = "사진";
		}

		ChatMember member = chatMemberRepository.findByChatRoomIdAndMemberId(request.getRoomId(), request.getMemberId())
			.orElseThrow(() -> new IllegalArgumentException());
		ChatRoom room = ChatRoom.builder().id(request.getRoomId()).lastMessage(lastMessage).build();

		ChatMessage message = chatMessageRepository.save(ChatMessage.builder()
			.message(request.getMessage())
			.chatMember(member)
			.chatRoom(room)
			.type(request.getType())
			.build());

		//room의 마지막 채팅 업데이트
		//room = chatRoomRepository.findById(request.getRoomId()).orElseThrow(() -> new IllegalArgumentException());
		chatRoomRepository.save(room);

		//읽지 않은 유저 카운트 증가
		List<ChatMember> roomMemberList = chatMemberRepository.findAllByChatRoomIdAndMemberIdNotIn(request.getRoomId(),
			memberList);

		for (ChatMember chatMember : roomMemberList) {
			chatMember.addReadMessage();
			chatMemberRepository.save(chatMember);
		}

		return ChatMessageResponse.from(message);

	}

	@Override
	@Transactional
	public void toRead(Long roomId, Long memberId) {
		ChatMember member = chatMemberRepository.findByChatRoomIdAndMemberId(roomId, memberId)
			.orElseThrow(() -> new IllegalArgumentException());

		member.toRead();
		chatMemberRepository.save(member);

	}

}
