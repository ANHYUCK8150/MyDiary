package com.diary.chat.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.chat.entity.ChatMember;

public interface ChatMemberRepository extends JpaRepository<ChatMember, Long> {

	List<ChatMember> findAllByMemberId(Long memberId);

	boolean existsByMemberIdAndChatRoomId(Long memberId, Long roomId);

	List<ChatMember> findAllByChatRoomIdAndMemberIdNot(Long id, Long memberId);

	Optional<ChatMember> findByChatRoomIdAndMemberId(Long roomId, Long memberId);

	List<ChatMember> findAllByChatRoomIdAndMemberIdNotIn(Long roomId, Set<Long> memberList);

}
