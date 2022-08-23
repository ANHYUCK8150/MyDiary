package com.diary.memo.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.common.dto.PageResponse;
import com.diary.memo.dto.MemoRequest;
import com.diary.memo.dto.MemoResponse;
import com.diary.memo.entity.MemoCategory;
import com.diary.memo.service.MemoService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@Api(value = "/api/v1", description = "메모 API")
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class MemoController {
	private final MemoService memoService;

	@ApiOperation(value = "메모 카테고리 리스트 조회")
	@GetMapping("/memo/category")
	public ResponseEntity<List<MemoCategory>> getCategorys() {

		return ResponseEntity.ok(memoService.getCategorys());
	}

	@ApiOperation(value = "나의 메모 리스트 조회")
	@GetMapping("/users/{memberId}/memo")
	public ResponseEntity<PageResponse<MemoResponse>> getMyMemos(
		@PathVariable
		Long memberId,
		Pageable pageable) {

		return ResponseEntity.ok(memoService.getMyMemos(memberId, pageable));
	}

	@ApiOperation(value = "메모 리스트 조회")
	@GetMapping("/memo")
	public ResponseEntity<PageResponse<MemoResponse>> getMemos(
		Pageable pageable) {

		return ResponseEntity.ok(memoService.getMemos(pageable));
	}

	@ApiOperation(value = "메모 등록")
	@PostMapping("/memo")
	public ResponseEntity<MemoResponse> setMemo(
		@RequestBody
		MemoRequest memoRequest) {

		return ResponseEntity.ok(memoService.setMemo(memoRequest));
	}

	@ApiOperation(value = "메모 수정")
	@PutMapping("/memo/{memoId}")
	public ResponseEntity<MemoResponse> updateMemo(
		@PathVariable
		Long memoId,
		@RequestBody
		MemoRequest memoRequest) {

		memoRequest.setId(memoId);

		return ResponseEntity.ok(memoService.setMemo(memoRequest));
	}

	@ApiOperation(value = "메모 삭제")
	@DeleteMapping("/memo/{memoId}")
	public ResponseEntity<Boolean> removeMemo(
		@PathVariable
		Long memoId) {

		memoService.removeMemo(memoId);

		return ResponseEntity
			.status(HttpStatus.NO_CONTENT)
			.build();
	}

}
