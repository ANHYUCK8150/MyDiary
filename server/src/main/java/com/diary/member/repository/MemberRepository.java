package com.diary.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
