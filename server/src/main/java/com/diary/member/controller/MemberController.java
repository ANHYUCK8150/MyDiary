package com.diary.member.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.diary.member.dto.MemberDto;
import com.diary.member.dto.SignUpRequest;
import com.diary.member.dto.SignUpResponse;
import com.diary.member.service.MemberService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class MemberController {
	private final ModelMapper mapper;
	private final MemberService memberService;

	@ApiOperation(value = "회원가입")
	@PostMapping
	public ResponseEntity<SignUpResponse> setMember(
		SignUpRequest signUpRequest,
		@RequestBody
		MultipartFile imageFile) {

		MemberDto memberDto = mapper.map(signUpRequest, MemberDto.class);

		return ResponseEntity.status(HttpStatus.CREATED).body(memberService.setMember(memberDto, imageFile));
	}
}
