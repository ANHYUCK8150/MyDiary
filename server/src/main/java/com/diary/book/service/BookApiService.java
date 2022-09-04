package com.diary.book.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookApiService {
	private final ObjectMapper mapper;
	private final WebClient webClient = WebClient.builder().baseUrl("https://openapi.naver.com/v1/search/").build();

}
