package com.diary.memo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diary.memo.entity.Memo;

public interface MemoRepository extends JpaRepository<Memo, Long> {

}
