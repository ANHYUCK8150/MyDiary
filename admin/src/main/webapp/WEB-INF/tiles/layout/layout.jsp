<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
<meta name="robots" content="nosnippet" />
<meta name="robots" content="noindex"> 

<title>관리자 페이지</title>
</head>
<body>
	<div id="header_warp">
		<tiles:insertAttribute name="header" />
		<div class="dim_layer" style="display:  none"></div>
	</div>
	<div id="content" >
		<tiles:insertAttribute name="content" />
	</div>
	<div id="footer_wrap">
		<tiles:insertAttribute name="footer" />
	</div>
</body>
</html>