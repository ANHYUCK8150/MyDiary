package com.diary.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.chat.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

}
