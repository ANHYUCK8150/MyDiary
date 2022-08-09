package com.diary.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.diary.common.token.JwtAuthenticationEntryPoint;
import com.diary.common.token.TokenAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity // Spring Security 활성화
@EnableGlobalMethodSecurity( // SecurityMethod 활성화
	securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private static final String[] PERMIT_URL_ARRAY = {
		/* auth*/
		"/auth/**", "/oauth2/**",
		/* api */
		"/api/**",
		/* swagger v2 */
		"/v2/api-docs",
		"/swagger-resources",
		"/swagger-resources/**",
		"/configuration/ui",
		"/configuration/security",
		"/swagger-ui.html",
		"/webjars/**",
		/* swagger v3 */
		"/v3/api-docs/**",
		"/swagger-ui/**",
		/* soket */
		"/ws-stomp/**",
		"/sub/**",
		"/pub/**",
		/* 모든 url 인증 없이 접근 가능 추후 삭제해야함 */
		"/**"
	};

	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Bean
	public TokenAuthenticationFilter tokenAuthenticationFilter() {
		return new TokenAuthenticationFilter();
	}

	// 암호화에 필요한 PasswordEncoder Bean 등록
	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.cors()
			.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			// CSRF 비활성화
			.csrf().disable()
			// 로그인폼 비활성화
			.formLogin().disable()
			// 기본 로그인 창 비활성화
			.httpBasic().disable()
			//허용 url 설정
			.authorizeRequests().antMatchers(PERMIT_URL_ARRAY).permitAll()
			.anyRequest().authenticated()
			//JWT Exception 설정
			.and().exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint);

		http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
	}

}
