package com.diary.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.chat.entity.ChatMember;

public interface ChatMemberRepository extends JpaRepository<ChatMember, Long> {

}
