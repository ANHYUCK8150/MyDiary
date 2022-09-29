package com.diary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.diary.book.repository.BookInfoESRepository;
import com.diary.common.config.AppProperties;

@EnableJpaAuditing
@EnableJpaRepositories(excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = BookInfoESRepository.class))
@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class MyDiaryApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyDiaryApplication.class, args);
	}

}
