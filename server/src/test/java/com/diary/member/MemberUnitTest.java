package com.diary.member;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.diary.member.entity.Member;
import com.diary.member.repository.MemberRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class MemberUnitTest {
	@Autowired
	private MemberRepository memberRepository;

	Member member;

	@BeforeEach
	void initData() {
		member = memberRepository.save(Member.builder()
			.name("테스터")
			.password("1234")
			.build());
	}
}
