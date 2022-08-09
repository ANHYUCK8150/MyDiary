package com.diary.common.entity;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.diary.member.entity.Member;

import lombok.Getter;

@Getter
public class UserPrincipal implements UserDetails {

	private Long id;
	private String name;

	public UserPrincipal(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public static UserPrincipal create(Member user) {
		return new UserPrincipal(
			user.getId(),
			user.getName());
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return this.name;
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return false;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}
}
