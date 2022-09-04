package com.diary.book.service;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.diary.book.dto.ApiNaverBookResponse;
import com.diary.book.dto.BookInfoDto;
import com.diary.common.dto.PageResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookApiService {
	private final ObjectMapper mapper;

	@Value("${api.naver.book.id}")
	private String naverBookId;

	@Value("${api.naver.book.key}")
	private String naverBookKey;

	private static final int PAGE_SIZE = 20;

	public PageResponse<BookInfoDto> search(String query, int pageNum) {
		return naverBook(query, pageNum);
	}

	/*
	 * 네이버 book
	 */
	private PageResponse<BookInfoDto> naverBook(String query, int pageNum) {
		WebClient webClient = WebClient.builder()
			.baseUrl("https://openapi.naver.com/v1/search/")
			.defaultHeader("X-Naver-Client-Id", naverBookId)
			.defaultHeader("X-Naver-Client-Secret", naverBookKey)
			.build();

		String url = "book.json?query=" + query
			+ "&display=" + PAGE_SIZE
			+ "&start=" + pageNum;

		String result = webClient.get().uri(url).accept(MediaType.APPLICATION_JSON).retrieve()
			.bodyToMono(String.class).block();

		PageResponse<BookInfoDto> pageResponse = new PageResponse<>();

		try {
			//도서 조회 반환값 DTO 변환
			ApiNaverBookResponse response = mapper.readValue(result, ApiNaverBookResponse.class);

			pageResponse.setPageNumber(response.getPageNumber());
			pageResponse.setPageSize(PAGE_SIZE);
			pageResponse.setTotalElements(response.getTotalElements());
			pageResponse.setTotalPages(response.getTotalPages());
			pageResponse.setContents(response.getItems().stream()
				.map(BookInfoDto::from)
				.collect(Collectors.toList()));

		} catch (Exception e) {
			pageResponse.setPageNumber(0);
			pageResponse.setPageSize(PAGE_SIZE);
			pageResponse.setTotalElements(Long.parseLong("0"));
			pageResponse.setTotalPages(0);
		}

		return pageResponse;
	}

}
