package com.diary.chat.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
import com.diary.common.StorageUploader;
import com.diary.common.dto.FileUploadResponse;
import com.diary.common.dto.PageResponse;
import com.diary.member.entity.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatServiceImpl implements ChatService {
	private final ChatRoomRepository chatRoomRepository;
	private final ChatMessageRepository chatMessageRepository;
	private final ChatMemberRepository chatMemberRepository;

	private final StorageUploader storageUploader;

	private static Integer PAGESIZE = 100;

	@Override
	public List<ChatRoomResponse> getRoomList(Long memberId) {
		return chatRoomRepository.findAllByChatMembersMemberIdOrderByModifiedDateDesc(memberId).stream()
			.map(room -> ChatRoomResponse.from(room, memberId))
			.collect(Collectors.toList());

	}

	@Override
	public PageResponse<ChatMessageResponse> getMessages(Long roomId, Long userId, Pageable pageable) {
		ChatMember member = chatMemberRepository.findByChatRoomIdAndMemberId(roomId, userId)
			.orElseThrow(() -> new IllegalArgumentException());

		//페이징 선언
		Pageable pageRequest = PageRequest.of(pageable.getPageNumber(), PAGESIZE,
			Sort.by("id").descending());

		Page<ChatMessageResponse> pageInfo = chatMessageRepository.findAllByChatRoomIdAndCreatedDateAfter(roomId,
			member.getCreatedDate(), pageRequest).map(ChatMessageResponse::from);

		return PageResponse.<ChatMessageResponse>builder()
			.contents(pageInfo.getContent())
			.pageNumber(pageInfo.getNumber())
			.pageSize(pageInfo.getSize())
			.totalPages(pageInfo.getTotalPages())
			.totalElements(pageInfo.getTotalElements())
			.build();
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

	@Override
	public FileUploadResponse sendImage(MultipartFile imageFile) {
		try {
			return storageUploader.upload(imageFile, "chat");
		} catch (IOException e) {}
		return null;
	}

	/*
	 * 1대1 대화하기
	 */
	@Override
	@Transactional
	public ChatRoomResponse setRoom(Long memberId, Long lenderId) {
		//방이 있는지 확인! [전체 채팅방 제외]

		ChatMember chatMember = chatMemberRepository.findAllByMemberId(memberId).stream()
			.filter(room -> !room.getChatRoom().getId().equals(Long.parseLong("1")))
			.filter(
				r -> chatMemberRepository.findByChatRoomIdAndMemberId(r.getChatRoom().getId(), lenderId)
					.orElse(null) != null)
			.findFirst()
			.orElse(null);

		//기존 대화방 있으면 리턴
		if (chatMember != null) {
			return ChatRoomResponse.from(chatMember.getChatRoom(), lenderId);
		} else {
			ChatRoom room = ChatRoom.builder().lastMessage("").build();
			room.addMember(
				ChatMember.builder().notReadMessage(0).member(Member.builder().id(memberId).build()).build());
			room.addMember(
				ChatMember.builder().notReadMessage(0).member(Member.builder().id(lenderId).build()).build());

			return ChatRoomResponse.from(chatRoomRepository.save(room), lenderId);
		}

	}

}
