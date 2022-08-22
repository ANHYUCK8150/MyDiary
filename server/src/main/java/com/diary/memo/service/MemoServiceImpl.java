package com.diary.memo.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.common.dto.PageResponse;
import com.diary.memo.dto.MemoDto;
import com.diary.memo.dto.MemoRequest;
import com.diary.memo.dto.MemoResponse;
import com.diary.memo.entity.Memo;
import com.diary.memo.repository.MemoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemoServiceImpl implements MemoService {
	private final MemoRepository memoRepository;

	/*
	 * 메모 리스트 페이지네이션
	 */
	@Override
	public PageResponse<MemoResponse> getMemos(Pageable pageable) {

		Page<MemoResponse> pageInfo = memoRepository.findAll(pageable).map(MemoResponse::from);

		return PageResponse.<MemoResponse>builder()
			.contents(pageInfo.getContent())
			.pageNumber(pageInfo.getNumber())
			.pageSize(pageInfo.getSize())
			.totalPages(pageInfo.getTotalPages())
			.totalElements(pageInfo.getTotalElements())
			.build();
	}

	/*
	 * 메모 등록
	 */
	@Override
	@Transactional
	public MemoResponse setMemo(MemoRequest memoRequest) {
		return MemoResponse.from(memoRepository.save(Memo.from(MemoDto.from(memoRequest))));
	}

	/*
	 * 메모 삭제
	 */
	@Override
	@Transactional
	public void removeMemo(Long memoId) {
		memoRepository.deleteById(memoId);
	}
}
