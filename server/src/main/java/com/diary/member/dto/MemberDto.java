package com.diary.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MemberDto {
	private Long id;
	private String name;
	private String password;
	private String imageUrl;
	private String introduction;

	@Builder
	public MemberDto(Long id, String name, String password, String imageUrl, String introduction) {
		this.id = id;
		this.name = name;
		this.password = password;
		this.imageUrl = imageUrl;
		this.introduction = introduction;
	}

}
