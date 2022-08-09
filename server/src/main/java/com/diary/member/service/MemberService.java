package com.diary.member.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface MemberService {

	UserDetails loadUserById(Long userId);

}
