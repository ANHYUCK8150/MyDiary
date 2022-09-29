package com.diary.common.config;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import com.diary.book.repository.BookInfoESRepository;

@Configuration
@EnableElasticsearchRepositories(basePackageClasses = {BookInfoESRepository.class})
public class ElasticsearchConfig {
	@Value("${elasticsearch.host}")
	private String host;

	@Value("${elasticsearch.port}")
	private String port;

	@Bean
	public RestHighLevelClient client() {
		ClientConfiguration clientConfiguration = ClientConfiguration.builder()
			.connectedTo(host + ":" + port)
			.build();

		return RestClients.create(clientConfiguration).rest();
	}

	@Bean
	public ElasticsearchOperations elasticsearchTemplate() {
		return new ElasticsearchRestTemplate(client());
	}
}
