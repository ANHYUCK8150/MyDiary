package com.diary.member.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.diary.common.entity.CurrentUser;
import com.diary.common.entity.UserPrincipal;
import com.diary.member.dto.LoginRequest;
import com.diary.member.dto.LoginResponse;
import com.diary.member.dto.MemberDto;
import com.diary.member.dto.MemberResponse;
import com.diary.member.dto.ProfileRequest;
import com.diary.member.dto.SignUpRequest;
import com.diary.member.dto.SignUpResponse;
import com.diary.member.service.MemberService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

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

	@ApiOperation(value = "로그인")
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> getLogin(
		@RequestBody
		LoginRequest loginRequest) {
		return ResponseEntity.ok(memberService.login(loginRequest));
	}

	@ApiOperation(value = "유저 정보 조회")
	@GetMapping("/{memberId}")
	public ResponseEntity<MemberResponse> getMember(
		@PathVariable
		Long memberId) {
		return ResponseEntity.ok(memberService.findById(memberId));
	}

	@ApiOperation(value = "로그인 중인 유저정보 확인")
	@GetMapping("/login/checked")
	public ResponseEntity<MemberResponse> checkedLogin(
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal) {
		return ResponseEntity.ok(memberService.findById(userPrincipal.getId()));
	}

	@ApiOperation(value = "프로필 수정")
	@PutMapping
	public ResponseEntity<MemberResponse> updateMember(
		@ApiIgnore
		@CurrentUser
		UserPrincipal userPrincipal,
		ProfileRequest profileRequest,
		@RequestBody
		MultipartFile imageFile) {

		return ResponseEntity.ok(memberService.updateMember(userPrincipal.getId(), profileRequest, imageFile));
	}
}
