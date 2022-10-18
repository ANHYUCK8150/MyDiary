package com.diary.survey;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SurveryTest {
	public static int checkCnt = 0;
	public static int patternCnt = 2;
	public static int cnt = 0;

	@Test
	@DisplayName("설문조사 결과 알고리즘")
	void surveryTest() {
		/*
		 * 설문조사 유형 ABCDEF가 존재.
		 * 유형 문항마다 불량인지 정상인지 체크
		 * 3가지 이상 동일한 패턴이 2번 이상일경우 불량.
		 * 불량 : 0, 정상 : 1 결과값 반환.
		 */
		String[] checkList = {"AFFCBFFCBE", "ABCDABCDEF", "FFFFFFFFFF", "BCBFBCBAFA", "CDEFABCABC"};
		/*
		 *  checkList[0] = AF[FCB][FCB]EF --> 3자리 같은게 2번 있어서 불량
		 *  checkList[1] = [ABCD][ABCD]EF --> 4자리 같은게 2번 있어서 불량
		 *  checkList[2] = [FFF][FFF][FFF]F --> 3자리 같은게 3번 있어서 불량
		 *  checkList[3] = [BCB]F[BCB]AFA --> 3자리 같은게 2번 있지만 연속적이지 않아서 정상
		 *  결과값 => [0,0,0,1]
		 */

		int[] result = new int[checkList.length];

		for (int i = 0; i < checkList.length; i++) {
			checkCnt = 0;
			cnt = 0;
			suerverDFS(0, 3, checkList[i].substring(0, 3), checkList[i]);
			if (checkCnt < patternCnt) {
				result[i] = 1;
			}
		}

		int[] answer = {0, 0, 0, 1, 0};
		Assertions.assertThat(result).isEqualTo(answer);

	}

	void suerverDFS(int idx, int n, String pattern, String question) {
		if (checkCnt >= patternCnt) {
			return;
		}
		/*
		 * n 패턴 자리수, k 동일한 패턴 제한 수
		 */
		if (n * idx + n + cnt > question.length()) {
			checkCnt = 0;
			cnt++;
			n = 3;
			idx = 0;
			pattern = question.substring(cnt, n + cnt);
		}

		if (cnt + n >= question.length()) {
			return;
		}

		int start = n * idx + cnt;
		int end = n + start;

		String compareStr = question.substring(start, end);
		if (pattern.equals(compareStr)) {
			checkCnt++;
			suerverDFS(idx + 1, n, pattern, question);
		} else {
			checkCnt = 0;
			pattern = question.substring(cnt, n + 1 + cnt);
			suerverDFS(0, n + 1, pattern, question);
			return;
		}

	}
}
