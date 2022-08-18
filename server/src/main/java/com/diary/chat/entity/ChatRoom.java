package com.diary.chat.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.diary.common.entity.BaseTimeEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class ChatRoom extends BaseTimeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(columnDefinition = "TEXT")
	private String lastMessage;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "chatRoom", cascade = CascadeType.REFRESH)
	private List<ChatMember> member = new ArrayList<>();

	@Builder
	public ChatRoom(Long id, String lastMessage) {
		this.id = id;
		this.lastMessage = lastMessage;
	}

}
