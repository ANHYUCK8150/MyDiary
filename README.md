# MyDiary (http://blackah.site)
연구 개발 blog  
Design by 개인책방(https://github.com/ttukttak3/ttukttak)

## 기술 스택
 - 프론트: React, Redux, styled-components
 - 서버
   - SpringBoot, Spring Security, Gradle, JPA, WebSocket
   - (Redis 메세지 큐 활용하려고 했으나 AWS에 설치가 원활하게 진행되지 않아 잠시 보류!)
   - Elasticsearch, Logstash, Kibana
   - AWS EC2, Jenkins, Nginx
   - MariaDB

## Elasticsearch 성능비교
 - DB 데이터 약 16만개
   - 일반 쿼리 조회 : http://blackah.site/api/v1/books/search?query=달러&page=1
     - times : 7.45s
   - elasticsearch : http://blackah.site/api/v1/books/elasticsearch?query=달러&page=1
     - times : 888ms

## Websocket을 통한 실시간 채팅
 - 
