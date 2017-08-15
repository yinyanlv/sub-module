<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored ="false" %>
<% request.setAttribute("pageCode", "new-part-task-detail"); %>
<!DOCTYPE html>

<html>
    <head>
      <title>新件任务详细</title>
        <meta name="viewport" content="width=device-width" />

        <link rel="shortcut icon" href="${path}/favicon.png"  type="image/x-icon" />
    </head>
  <body>

     <%@ include file="../common/common.jsp" %>

	 <script type='text/javascript'>

	 	App.pageConfig['partCode'] = '${partCode}';

	 </script>

    </body>
</html>