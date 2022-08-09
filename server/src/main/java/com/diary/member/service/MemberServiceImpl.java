package com.diary.member.service;

import java.io.IOException;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.diary.common.StorageUploader;
import com.diary.common.dto.FileUploadResponse;
import com.diary.common.entity.UserPrincipal;
import com.diary.member.dto.MemberDto;
import com.diary.member.dto.SignUpResponse;
import com.diary.member.entity.Member;
import com.diary.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {
	private final MemberRepository memberRepository;

	private final PasswordEncoder pwdEncoder;
	private final StorageUploader storageUploader;

	@Override
	public UserDetails loadUserById(Long userId) {
		Member member = memberRepository.findById(userId).orElseThrow(
			() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

		return UserPrincipal.create(member);
	}

	@Override
	@Transactional
	public SignUpResponse setMember(MemberDto memberDto, MultipartFile imageFile) {

		if (memberRepository.existsByName(memberDto.getName())) {
			//같은 네임이 있을 경우 조회 실패.
			return new SignUpResponse(false, "중복된 이름이 있습니다!");
		}

		/*
		 * 파일 업로드 (파일이 없는 경우 업로드 X)
		 */
		if (imageFile != null) {
			try {
				FileUploadResponse fileUploadResponse = storageUploader.upload(imageFile, "profile");
				memberDto.setImageUrl(fileUploadResponse.getUrl());
			} catch (IOException e) {}
		}

		memberDto.setPassword(pwdEncoder.encode(memberDto.getPassword()));

		memberRepository.save(Member.from(memberDto));

		return new SignUpResponse(true, "회원가입 완료!");
	}

}
