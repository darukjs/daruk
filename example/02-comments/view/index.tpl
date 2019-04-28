<head>
    <title>my comments app</title>
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"  media="screen,projection"/>
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>
<div class="container">
    <h2> comments list: </h2>
    <% if(comments.length){ %>
    <ul>
        <% comments.forEach(function(comment){ %>
           <li><%=comment.name%>: <%=comment.content%></li>
        <% }); %>
    </ul>
    <% }else{ %>
    <p>nothings yet...</p>
    <% } %>
    <p>
    <% let pages = Math.ceil(counts/limit) %>
    <% for(var num=1;num<=pages;num++){ 
      if(page+1 === num){ %>
        <%=num%>
    <% }else{ %>
        <a href="/?page=<%=num%>&limit=<%=limit%>"><%=num%></a>
    <% } } %>
    共<%=pages%>页 
    </p>
    <h2>comments:</h2>
    <div>
        <form action="/comments/insert" method="post">
        <p> <input type="text" name="name" placeholder="name"> </p>
        <p> <textarea name="content" placeholder="comment content"></textarea> </p>
        <p> <input type="submit" value="commit"> </p>
        </form>
    </div>
</div>

      <!--JavaScript at end of body for optimized loading-->
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
</body>