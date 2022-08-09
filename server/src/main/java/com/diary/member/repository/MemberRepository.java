package com.diary.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

	boolean existsByName(String name);

	Optional<Member> findByName(String name);

}
