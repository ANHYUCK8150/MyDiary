package com.diary.algo.eledisplay;

import java.util.LinkedList;
import java.util.Queue;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ElectronicDisplay {
	public static int displayLength = 6;

	/*
	 * 띄어쓰기는 _ 로 치환.
	 */
	@Test
	@DisplayName("전광판 알고리즘")
	void main() {
		String res1 = result(" hellow ", 2);
		String res2 = result(" hellow ", 6);

		Assertions.assertThat(res1).isEqualTo("ellow_");
		Assertions.assertThat(res2).isEqualTo("w__hel");
	}

	/*
	 * msg : 문구
	 * sec : 시간
	 * displayLength : 전광판 칸수
	 */
	String result(String msg, int sec) {
		msg = msg.replaceAll(" ", "_");

		Queue<String> que = new LinkedList<>();
		for (int i = 0; i < msg.length(); i++) {
			que.add(String.valueOf(msg.charAt(i)));
		}

		for (int i = 0; i < sec; i++) {
			String word = que.poll();
			que.add(word);
		}

		String result = "";
		for (int i = 0; i < displayLength; i++) {
			result += que.poll();
		}

		return result;
	}
}
