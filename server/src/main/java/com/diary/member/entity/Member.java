package com.diary.member.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.diary.common.entity.BaseTimeEntity;
import com.diary.member.dto.MemberDto;
import com.diary.member.dto.ProfileRequest;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@Entity
@ToString
public class Member extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 10)
	private String name;

	@Column
	private String password;

	@Column
	private String imageUrl;

	@Column(columnDefinition = "TEXT")
	private String introduction;

	public Member update(ProfileRequest profileRequest) {
		this.name = profileRequest.getName();
		this.introduction = profileRequest.getIntroduction();
		this.imageUrl = profileRequest.getImageUrl();
		return this;
	}

	@Builder
	public Member(Long id, String name, String password, String imageUrl,
		String introduction) {
		this.id = id;
		this.name = name;
		this.password = password;
		this.imageUrl = imageUrl;
		this.introduction = introduction;
	}

	public static Member from(MemberDto memberDto) {
		return Member.builder()
			.id(memberDto.getId())
			.name(memberDto.getName())
			.imageUrl(memberDto.getImageUrl())
			.password(memberDto.getPassword())
			.introduction(memberDto.getIntroduction())
			.build();
	}
}
