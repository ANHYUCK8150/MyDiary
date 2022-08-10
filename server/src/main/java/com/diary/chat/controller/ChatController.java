package com.diary.chat.controller;

import org.springframework.web.bind.annotation.RestController;

import com.diary.chat.service.ChatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatController {
	private final ChatService chatService;
}
