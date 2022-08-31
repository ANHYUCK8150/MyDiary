package com.diary.chat.service;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.diary.chat.dto.ChatMessageResponse;
import com.diary.chat.dto.ChatRoomResponse;
import com.diary.chat.dto.MessageRequest;
import com.diary.common.dto.FileUploadResponse;
import com.diary.common.dto.PageResponse;

public interface ChatService {

	List<ChatRoomResponse> getRoomList(Long id);

	PageResponse<ChatMessageResponse> getMessages(Long roomId, Long userId, Pageable pageable);

	ChatMessageResponse sendMessage(MessageRequest request, Set<Long> memberList);

	void toRead(Long roomId, Long memberId);

	FileUploadResponse sendImage(MultipartFile imageFile);

	ChatRoomResponse setRoom(Long memberId, Long lenderId);

}
