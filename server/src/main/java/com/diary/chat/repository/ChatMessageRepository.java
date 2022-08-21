package com.diary.chat.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.chat.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

	List<ChatMessage> findAllByChatRoomId(Long roomId);

	List<ChatMessage> findAllByChatRoomIdAndCreatedDateAfter(Long roomId, LocalDateTime createdDate);

}
