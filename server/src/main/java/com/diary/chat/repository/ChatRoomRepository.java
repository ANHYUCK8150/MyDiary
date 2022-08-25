package com.diary.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.chat.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

	List<ChatRoom> findAllByChatMembersMemberIdOrderByModifiedDateDesc(Long memberId);

}
