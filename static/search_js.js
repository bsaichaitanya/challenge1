function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});

$(document).ready(function() {

    $("#run").click(function(){
        paramslist = {}


        function title(){
        	if(title != ""){
        		paramslist.title = $("#title").val();
        	}else{
        		paramslist = paramslist;
        	}

        }

        function link(){
        	if(link != ""){
        		paramslist.link = $("#link").val();
        	}else{
        		paramslist = paramslist;
        	}
        }



        title();
        link();

        
    	$.get('/oursearchdata', paramslist, function(response){ 
		    console.log(response);
			$(".datarow").empty();
			
			result = JSON.stringify(response, undefined, 4);

			$("#ourjson").html(syntaxHighlight(result));

			result1 = $.parseJSON(result);

			console.log(result1[0].title);

			console.log(result1[0].link);

			total = Number(result1.length);


			content = "";

			for(i=0; i<total; i++){
			console.log(result1[i].title);
			divhtml = '<div class="item' + i + '"><button class="btn btn-lg">question' + i + '</button><p id="title' + i + '">' + result1[i].title + '</p><p id="link' + i + '">' + result1[i].link + '</p></div>'
			// $(".datarow").append(content);
			content = content + divhtml;

			}

			$(".datarow").append(content);
			// $.each(data, function() {
			//   $.each(this, function(key, val){
			//     alert(val);//here data 
			//       alert (key); //here key
		     
		});    

        



			

    });

});






