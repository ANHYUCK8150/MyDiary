package com.diary.algo.surround;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.Data;

@SpringBootTest
public class SurroundTest {
	@Data
	class Town {
		int id;
		String city;
		String district;
		String name;
		double latitude;
		double longitude;

		public Town(int id, String city, String district, String name, double latitude, double longitude) {
			this.id = id;
			this.city = city;
			this.district = district;
			this.name = name;
			this.latitude = latitude;
			this.longitude = longitude;
		}

	}

	List<Town> townList = new ArrayList<>();

	@Nested
	@DisplayName("주변 지역 조회")
	class main {
		@BeforeEach
		void initData() {
			townList.add(new Town(1, "서울특별시", "양천구", "신정동", 37.51852890, 126.85426360));
			townList.add(new Town(2, "서울특별시", "양천구", "목동", 37.53037770, 126.87123230));
			townList.add(new Town(3, "서울특별시", "양천구", "신월동", 37.53280800, 126.83148700));

			townList.add(new Town(4, "서울특별시", "강서구", "염창동", 37.55375100, 126.87097770));
			townList.add(new Town(5, "서울특별시", "강서구", "등촌동", 37.55581550, 126.85892870));
			townList.add(new Town(6, "서울특별시", "강서구", "화곡동", 37.54407500, 126.84772500));
			townList.add(new Town(7, "서울특별시", "강서구", "가양동", 37.56952390, 126.84470990));
			townList.add(new Town(8, "서울특별시", "강서구", "마곡동", 37.57380000, 126.83040000));
			townList.add(new Town(9, "서울특별시", "강서구", "내발산동", 37.55350000, 126.83540000));
			townList.add(new Town(10, "서울특별시", "강서구", "외발산동", 37.54940000, 126.82070000));
			townList.add(new Town(11, "서울특별시", "강서구", "공항동", 37.55882960, 126.81014370));
			townList.add(new Town(12, "서울특별시", "강서구", "방화동", 37.57733300, 126.81332500));
			townList.add(new Town(13, "서울특별시", "강서구", "개화동", 37.58740000, 126.80680000));
			townList.add(new Town(14, "서울특별시", "강서구", "과해동", 37.56620000, 126.78720000));
			townList.add(new Town(15, "서울특별시", "강서구", "오곡동", 37.55340000, 126.78400000));
			townList.add(new Town(16, "서울특별시", "강서구", "오쇠동", 37.54350000, 126.79840000));
		}

		@Test
		void start() {
			double latitude = 37.5375824;
			double longiude = 126.8411747;

			//3km 반경
			townList.stream()
				.filter(c -> getDistance(latitude, longiude, c.getLatitude(), c.getLongitude()) < 3000)
				.forEach(c -> System.out.println(c.toString()));
		}

		double getDistance(double myLat, double myLon, double difLat, double difLon) {
			double dLat = Math.toRadians(difLat - myLat);
			double dLon = Math.toRadians(difLon - myLon);

			double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(Math.toRadians(myLat))
				* Math.cos(Math.toRadians(difLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
			double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			double d = 6371 * c * 1000;
			return d;
		}

	}
}
