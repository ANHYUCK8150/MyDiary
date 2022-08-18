package com.diary.chat.service;

import java.util.List;

import com.diary.chat.dto.ChatMessageResponse;
import com.diary.chat.dto.ChatRoomResponse;
import com.diary.chat.dto.MessageRequest;

public interface ChatService {

	List<ChatRoomResponse> getRoomList(Long id);

	List<ChatMessageResponse> getMessages(Long roomId);

	ChatMessageResponse sendMessage(MessageRequest request, List<Long> memberList);

	void toRead(Long roomId, Long memberId);

}
