package com.diary.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProfileRequest {
	private String name;
	private String introduction;
	private String imageUrl;
}
