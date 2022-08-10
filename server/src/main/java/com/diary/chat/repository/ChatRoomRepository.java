package com.diary.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.chat.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

}
