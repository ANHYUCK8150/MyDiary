package com.diary.chat.controller;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.diary.chat.dto.MessageRequest;

@Component
public class WebSocketEventListener {
	@Autowired
	private MessageController messageController;

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

		MessageRequest messageRequest = (MessageRequest)headerAccessor.getSessionAttributes().get("MessageRequest");

		if (messageRequest != null) {
			Set<Long> memberList = messageController.roomList.get(messageRequest.getRoomId()).stream()
				.filter(memberId -> !memberId.equals(messageRequest.getMemberId()))
				.collect(Collectors.toSet());

			messageController.roomList.put(messageRequest.getRoomId(), memberList);

		}

	}
}
