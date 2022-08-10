package com.diary.chat.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;

import com.diary.common.entity.BaseTimeEntity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class ChatMessage extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "chat_member_id")
	private ChatMember member;

	@ManyToOne
	@JoinColumn(name = "chat_room_id")
	private ChatRoom room;

	@ColumnDefault("'TEXT'")
	private String message;

	@Enumerated(EnumType.STRING)
	private messageType type = messageType.TEXT;

	public enum messageType {
		TEXT, IMAGE
	}

	@Builder
	public ChatMessage(Long id, ChatMember member, ChatRoom room, String message,
		messageType type) {
		this.id = id;
		this.member = member;
		this.room = room;
		this.message = message;
		this.type = type;
	}
}
