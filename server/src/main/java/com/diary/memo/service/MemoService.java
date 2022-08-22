package com.diary.memo.service;

import org.springframework.data.domain.Pageable;

import com.diary.common.dto.PageResponse;
import com.diary.memo.dto.MemoRequest;
import com.diary.memo.dto.MemoResponse;

public interface MemoService {

	PageResponse<MemoResponse> getMemos(Pageable pageable);

	MemoResponse setMemo(MemoRequest memoRequest);

	void removeMemo(Long memoId);

}
