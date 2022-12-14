package com.diary.chat.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.diary.chat.dto.ChatMessageResponse;
import com.diary.chat.dto.MessageRequest;
import com.diary.chat.service.ChatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MessageController {
	public Map<Long, Set<Long>> roomList = new HashMap<>();
	private final SimpMessagingTemplate simpMessagingTemplate;
	private final ChatService chatService;

	@MessageMapping("/chat/message")
	public void sendMessage(
		@Payload
		MessageRequest request) {

		//해당 방에 채팅보내기
		this.simpMessagingTemplate.convertAndSend("/api/sub/chat/room/" + request.getRoomId(),
			ChatMessageResponse.from(request));

		//message send(DB저장은 후 순위에 두어 속도 개선)
		chatService.sendMessage(request, roomList.get(request.getRoomId()));

		//목록에 메시지 보내기
		this.simpMessagingTemplate.convertAndSend("/api/sub/chat/room", "SEND");

		//푸시 알림
		this.simpMessagingTemplate.convertAndSend("/api/sub/notification", ChatMessageResponse.from(request));

	}

	@MessageMapping("/room/join")
	public void roomJoin(
		@Payload
		MessageRequest request,
		SimpMessageHeaderAccessor headerAccessor) {

		if (roomList.get(request.getRoomId()) == null) {
			Set<Long> memberList = new HashSet<Long>();
			roomList.put(request.getRoomId(), memberList);
		}

		roomList.get(request.getRoomId()).add(request.getMemberId());
		roomList.put(request.getRoomId(), roomList.get(request.getRoomId()));

		headerAccessor.getSessionAttributes().put("MessageRequest", request);

		//해당 유저 입장 표시
		this.simpMessagingTemplate.convertAndSend("/api/sub/chat/room/" + request.getRoomId() + "/members",
			roomList.get(request.getRoomId()));

		//읽지 않은 메시지 카운트 조기화
		chatService.toRead(request.getRoomId(), request.getMemberId());

	}

}
