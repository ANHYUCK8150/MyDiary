package com.diary.member.dto;

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

}
