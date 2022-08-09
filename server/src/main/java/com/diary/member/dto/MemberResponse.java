package com.diary.member.dto;

import com.diary.member.entity.Member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberResponse {
	private Long id;
	private String name;
	private String imageUrl;
	private String introduction;

	@Builder
	private MemberResponse(Long id, String name, String imageUrl, String introduction) {
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.introduction = introduction;
	}

	public static MemberResponse from(Member member) {
		return MemberResponse.builder()
			.id(member.getId())
			.name(member.getName())
			.imageUrl(member.getImageUrl())
			.introduction(member.getIntroduction())
			.build();
	}

}
