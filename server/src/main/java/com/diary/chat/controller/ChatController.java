package com.diary.chat.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.diary.chat.dto.ChatMessageResponse;
import com.diary.chat.dto.ChatRoomResponse;
import com.diary.chat.service.ChatService;
import com.diary.common.dto.FileUploadResponse;
import com.diary.common.dto.PageResponse;
import com.diary.common.entity.CurrentUser;
import com.diary.common.entity.UserPrincipal;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@Api(value = "/api/v1/chat", description = "채팅 API")
@RequestMapping("/api/v1")
public class ChatController {
	private final ChatService chatService;

	@ApiOperation(value = "대화방 리스트")
	@GetMapping("/chat/rooms")
	public ResponseEntity<List<ChatRoomResponse>> getRoomsList(
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal) {

		return ResponseEntity.ok(chatService.getRoomList(userPrincipal.getId()));
	}

	@ApiOperation(value = "메시지 리스트")
	@GetMapping("/chat/rooms/{roomId}/messages")
	public ResponseEntity<PageResponse<ChatMessageResponse>> getRoomMessages(
		@PathVariable
		Long roomId,
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal,
		Pageable pageable) {

		return ResponseEntity.ok(chatService.getMessages(roomId, userPrincipal.getId(), pageable));
	}

	@ApiOperation(value = "채팅 이미지 저장")
	@PostMapping("/chat/send-image")
	public ResponseEntity<FileUploadResponse> sendImage(
		@RequestBody
		MultipartFile imageFile) {
		return ResponseEntity.ok(chatService.sendImage(imageFile));
	}

	@ApiOperation(value = "1대1 대화방 생성")
	@PostMapping("/users/{memberId}/chat")
	public ResponseEntity<ChatRoomResponse> setRoom(
		@PathVariable
		Long memberId,
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal) {

		//나한테 메시지 보내기 X
		if (memberId.equals(userPrincipal.getId())) {
			throw new IllegalArgumentException();
		}

		return ResponseEntity.ok(chatService.setRoom(memberId, userPrincipal.getId()));
	}
}
