package com.diary.memo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.memo.entity.MemoCategory;

public interface MemoCategoryRepository extends JpaRepository<MemoCategory, Long> {

}
