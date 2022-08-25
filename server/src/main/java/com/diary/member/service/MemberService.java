package com.diary.member.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import com.diary.member.dto.LoginRequest;
import com.diary.member.dto.LoginResponse;
import com.diary.member.dto.MemberDto;
import com.diary.member.dto.MemberResponse;
import com.diary.member.dto.ProfileRequest;
import com.diary.member.dto.SignUpResponse;

public interface MemberService {

	UserDetails loadUserById(Long userId);

	SignUpResponse setMember(MemberDto memberDto, MultipartFile imageFile);

	LoginResponse login(LoginRequest loginRequest);

	MemberResponse findById(Long memberId);

	MemberResponse updateMember(Long memberId, ProfileRequest profileRequest, MultipartFile imageFile);

	List<MemberResponse> getMemberList();

}
