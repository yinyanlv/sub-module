<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored ="false" %>
<% request.setAttribute("pageCode", "master"); %>
<!DOCTYPE html>

<html>
    <head>
    	<title>NIO 维修配件主数据管理系统</title>
        <meta name="viewport" content="width=device-width" />

        <link rel="shortcut icon" href="${path}/favicon.png"  type="image/x-icon" />
        <link type="text/css" rel="stylesheet" href="${path}/extjs/packages/core/src/util/svgzoomdrag/css/svgzoomdrag.css" />
    </head>
	<body>

    <%@ include file="../common/common.jsp" %>

     <script id="header_usertitle_template" type="text/template">
        <div id="header_title" class="header-user">
          <span class="text" title="">${username}</span>
          <span class="icon-caret x-fa fa-caret-down"></span>
        </div>
     </script>

     <script id="header_user_template" type="text/template">
       <div id="header_user" class="user-wrapper">
          <span class="icon-up fa fa-sort-up"></span>
          <div class="user-menu clearfix">
              <span class="header-icon"><img src="${path}/extjs/resources/images/gentlemen.png" alt=""></span>
              <ul class="header-userinfo">
                  <li><label>${username}</label></li>
                  <li>
                      <div><span>用户类型：管理员（VSE）</span></div>
                      <div><label></label></div>
                  </li>
              </ul>
          </div>
          <a class="btn-logout" data-field="log-out"><span class="btn-inner">退出登录</span></a>
       </div>
     </script>

     <script type="text/javascript" src="${path}/extjs/ext/charts/flexcroll.js"></script>
     <script type="text/javascript" src="${path}/extjs/packages/core/src/util/d3.js"></script>
     <script type="text/javascript" src="${path}/extjs/packages/core/src/util/snapSvg/snap.svg.js"></script>
    </body>
</html>