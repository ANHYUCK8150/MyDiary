package com.diary.chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.diary.chat.dto.MessageRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MessageController {
	private final SimpMessagingTemplate simpMessagingTemplate;

	@MessageMapping("/chat/message")
	public void sendMessage(
		@Payload
		MessageRequest request) {
		/*
		 * 해당 방이 있는지 체크하고 없으면 insert
		 */

		//해당 방에 채팅보내기
		this.simpMessagingTemplate.convertAndSend("/topic/chatToMember/" + request.getRoomId(), request);
	}
}
