package com.diary.chat.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.diary.chat.dto.ChatMessageResponse;
import com.diary.chat.dto.ChatRoomResponse;
import com.diary.chat.dto.MessageRequest;
import com.diary.common.dto.FileUploadResponse;

public interface ChatService {

	List<ChatRoomResponse> getRoomList(Long id);

	List<ChatMessageResponse> getMessages(Long roomId, Long userId);

	ChatMessageResponse sendMessage(MessageRequest request, List<Long> memberList);

	void toRead(Long roomId, Long memberId);

	FileUploadResponse sendImage(MultipartFile imageFile);

}
