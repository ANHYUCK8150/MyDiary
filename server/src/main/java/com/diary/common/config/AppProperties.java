package com.diary.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@ConfigurationProperties(prefix = "app")
public class AppProperties {
	private final Auth auth = new Auth();

	@Getter
	@Setter
	@RequiredArgsConstructor
	public static class Auth {
		private String tokenSecret;
		private long tokenExpirationMsec;

	}

}