package com.diary.chat.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.diary.common.entity.BaseTimeEntity;
import com.diary.member.entity.Member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class ChatMember extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private ChatRoom room;

	private Integer notReadMessage;

	@Builder
	public ChatMember(Long id, Member member, ChatRoom room, Integer notReadMessage) {
		this.id = id;
		this.member = member;
		this.room = room;
		this.notReadMessage = notReadMessage;
	}

}
