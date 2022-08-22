package com.diary.memo.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.diary.common.dto.PageResponse;
import com.diary.memo.dto.MemoRequest;
import com.diary.memo.dto.MemoResponse;
import com.diary.memo.entity.MemoCategory;

public interface MemoService {

	PageResponse<MemoResponse> getMemos(Pageable pageable);

	MemoResponse setMemo(MemoRequest memoRequest);

	void removeMemo(Long memoId);

	List<MemoCategory> getCategorys();

	PageResponse<MemoResponse> getMyMemos(Long memberId, Pageable pageable);

}
