package com.diary.member.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.diary.common.entity.UserPrincipal;
import com.diary.member.entity.Member;
import com.diary.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final MemberRepository memberRepository;

	@Override
	public UserDetails loadUserById(Long userId) {
		Member member = memberRepository.findById(userId).orElseThrow(
			() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

		return UserPrincipal.create(member);
	}

}
