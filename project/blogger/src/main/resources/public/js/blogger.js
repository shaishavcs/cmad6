  	$(document).ready(function() {
  		$.getJSON('rest/blog/list', { get_param: 'value' }, function(data) {
	  	      $.each(data, function(index) {
	  	    	  	var blogIdUrl = "rest/blog/get/"+data[index].id;
	  	    	  	$("#blogListDivId").append("<h4><a href='"+blogIdUrl+"'>"+data[index].title+"</a></h4>");
	  	    	  	$("#blogListDivId").append("<h5> <span class='glyphicon glyphicon-time'></span> Posted by "+data[index].author.firstName+" "+data[index].author.lastName+", "+data[index].createdDate+"</h5>");
	  	    	  	$("#blogListDivId").append("<br><br>");
	          });
  		});
	});

  	$(document).ready(function() {
  		
  	$("#searchBtn").click(function () {
  		$.getJSON("rest/blog/find?"+$( "#select#searchTypeId" ).val()+"&"+$( "#select#searchContentId" ).val(), function(data) {
	  	      $.each(data, function(index) {
	  	    	  	var blogIdUrl = "rest/blog/get/"+data[index].id;
	  	    	  	$("#blogListDivId").append("<h4><a href='"+blogIdUrl+"'>"+data[index].title+"</a></h4>");
	  	    	  	$("#blogListDivId").append("<h5> <span class='glyphicon glyphicon-time'></span> Posted by "+data[index].author.firstName+" "+data[index].author.lastName+", "+data[index].createdDate+"</h5>");
	  	    	  	$("#blogListDivId").append("<br><br>");
	          });
  		});
  	});
  	});
  	
  	
//	$.ajax({
//  url: "/rest/blog/list",
//contentType: "application/json",
//responseType: "application/json",
//dataType: "json"
//}).then(function(data) {
//    $.each(data, function(index) {
//  	    alert(data[index]);
//  	  	var blogIdUrl = "rest/blog/get/"+data[index].id;
////  	  	alert(blogIdUrl);
//  	  	$("#blogListDivId").append("<h4><a href='"+blogIdUrl+"'>"+data[index].title+"</a></h4>");
//  	  	$("#blogListDivId").append("<h5> <span class='glyphicon glyphicon-time'></span> Posted by "+data[index].author.firstName+" "+data[index].author.lastName+", "+data[index].createdDate+"</h5>");
////  	  	$("#blogListDivId").append("<p>"+data[index].blogContent+"</p>");
//  	  	$("#blogListDivId").append("<br><br>");
//  });
//});
