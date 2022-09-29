package com.diary.book.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.diary.book.entity.BookInfo;

public interface BookInfoESRepository extends ElasticsearchRepository<BookInfo, Long> {

	Page<BookInfo> searchByTitle(String query, Pageable pageable);
}
