package com.diary.memo.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.common.dto.PageResponse;
import com.diary.memo.dto.MemoRequest;
import com.diary.memo.dto.MemoResponse;
import com.diary.memo.service.MemoService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@Api(value = "/api/v1/memo", description = "메모 API")
@RequestMapping("/api/v1/memo")
@RequiredArgsConstructor
public class MemoController {
	private final MemoService memoService;

	@ApiOperation(value = "메모 리스트 조회")
	@GetMapping
	public ResponseEntity<PageResponse<MemoResponse>> getMemos(
		Pageable pageable) {

		return ResponseEntity.ok(memoService.getMemos(pageable));
	}

	@ApiOperation(value = "메모 등록")
	@PostMapping
	public ResponseEntity<MemoResponse> setMemo(
		MemoRequest memoRequest) {

		return ResponseEntity.ok(memoService.setMemo(memoRequest));
	}

	@ApiOperation(value = "메모 수정")
	@PutMapping("/{memoId}")
	public ResponseEntity<MemoResponse> updateMemo(
		@PathVariable
		Long memoId,
		MemoRequest memoRequest) {

		memoRequest.setId(memoId);

		return ResponseEntity.ok(memoService.setMemo(memoRequest));
	}

	@ApiOperation(value = "메모 삭제")
	@PutMapping("/{memoId}")
	public ResponseEntity<Boolean> removeMemo(
		@PathVariable
		Long memoId) {

		memoService.removeMemo(memoId);

		return ResponseEntity
			.status(HttpStatus.NO_CONTENT)
			.build();
	}

}
