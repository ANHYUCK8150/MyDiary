package com.diary.common.exception;

import org.springframework.http.HttpStatus;

import com.diary.common.dto.StatusResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusCode {
	INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "C-1", "Invalid input values"),
	MISSING_PARAMETER(HttpStatus.BAD_REQUEST, "C-2", "Missing parameters"),
	INVALID_METHOD(HttpStatus.BAD_REQUEST, "C-3", "Invalid method"),
	ILLEGAL_ARGUMENT(HttpStatus.BAD_REQUEST, "C-4", "Illegal argument"),
	UNAUTH(HttpStatus.UNAUTHORIZED, "C-5", "Unauthorized request"),
	SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "S-1", "Server error");

	private final HttpStatus httpStatus;
	private final String code;
	private final String message;

	public StatusResponse toResponse() {
		return new StatusResponse(this);
	}
}
