package com.diary.book.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ApiNaverBookResponse {
	@JsonProperty("start")
	private int pageNumber;

	@JsonProperty("total")
	private Long totalElements;

	@JsonProperty("display")
	private int pageSize;

	@JsonProperty("items")
	private List<ApiNaverBookItemResponse> items = new ArrayList<>();

	public int getTotalPages() {
		return (int)Math.ceil((double)this.totalElements / (double)this.pageSize);
	}
}
