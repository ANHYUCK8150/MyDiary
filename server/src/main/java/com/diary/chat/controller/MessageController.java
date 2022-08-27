package com.diary.chat.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
	public Map<Long, List<Long>> roomList = new HashMap<>();
	private final SimpMessagingTemplate simpMessagingTemplate;
	private final ChatService chatService;

	@MessageMapping("/chat/message")
	public void sendMessage(
		@Payload
		MessageRequest request) {

		//message send
		ChatMessageResponse messge = chatService.sendMessage(request, roomList.get(request.getRoomId()));

		//해당 방에 채팅보내기
		this.simpMessagingTemplate.convertAndSend("/api/sub/chat/room/" + request.getRoomId(), messge);

		//목록에 메시지 보내기
		this.simpMessagingTemplate.convertAndSend("/api/sub/chat/room", "SEND");
	}

	@MessageMapping("/room/join")
	public void roomJoin(
		@Payload
		MessageRequest request,
		SimpMessageHeaderAccessor headerAccessor) {

		if (roomList.get(request.getRoomId()) == null) {
			List<Long> memberList = new ArrayList<Long>();
			roomList.put(request.getRoomId(), memberList);
		}

		roomList.get(request.getRoomId()).add(request.getMemberId());
		roomList.put(request.getRoomId(), roomList.get(request.getRoomId()).stream()
			.distinct().collect(Collectors.toList()));

		headerAccessor.getSessionAttributes().put("MessageRequest", request);

		//읽지 않은 메시지 카운트 조기화
		chatService.toRead(request.getRoomId(), request.getMemberId());

	}

}
