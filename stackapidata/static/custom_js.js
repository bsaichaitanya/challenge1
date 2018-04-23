// our Json highlighting function for readability
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



// function for getting csrf cookie to avoid csrf problems
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


// function to insert csrf cookie in each request we sent to  our server to authenticate as valid user for getting and posting data
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});





$(document).ready(function() {


      // function to get stackoverflow json data we click on run
      $("#run").click(function(){
            paramlist = []

            function page(){
                  pagevar = $("#page").val();
                  pagevarstr = "page=" + pagevar + "&" ; 
                  paramlist.push(pagevarstr);

            }

            function pagesize(){
                  pagesizevar = $("#pagesize").val();
                  pagesizevarstr = "pagesize=" + pagevar + "&" ; 
                  paramlist.push(pagesizevarstr);
            }


            function fromdate(){
                  var from = $("#fromdate").val().split("/");
                  var d = new Date(from[2], from[0] - 1, from[1]);
                  seconds = d.getTime()/1000;
                  fromdatevar = seconds;

                  
                  fromdatevarstr = "fromdate=" + fromdatevar + "&" ; 
                  paramlist.push(fromdatevarstr);
            }

            function todate(){
                  var from = $("#todate").val().split("/");
                  var d = new Date(from[2], from[0] - 1, from[1]);
                  seconds = d.getTime()/1000;
                  todatevar = seconds;

                  
                  todatevarstr = "todate=" + todatevar + "&" ; 
                  paramlist.push(todatevarstr);
            }

            function order(){
                  ordervar = $("#order").val();
                  if(ordervar == 1){
                        ordervarnow = "asc";
                  }
                  if(ordervar == 2){
                        ordervarnow = "desc";
                  }
                  ordervarstr = "order=" + ordervarnow + "&" ; 
                  paramlist.push(ordervarstr);
            }

            function min(){
                  var from = $("#min").val().split("/");
                  var d = new Date(from[2], from[0] - 1, from[1]);
                  seconds = d.getTime()/1000;
                  minvar = seconds;

                  
                  minvarstr = "fromdate=" + minvar + "&" ; 
                  paramlist.push(minvarstr);
            }

            function max(){
                  var from = $("#max").val().split("/");
                  var d = new Date(from[2], from[0] - 1, from[1]);
                  seconds = d.getTime()/1000;
                  maxvar = seconds;

                  
                  maxvarstr = "fromdate=" + maxvar + "&" ; 
                  paramlist.push(maxvarstr);
            }

            function sort(){
                  sortvar = $("#sortorder").val();
                  if(sortvar == 1){
                        sortvarnow = "activity";
                  }
                  if(sortvar == 2){
                        sortvarnow = "votes";
                  }
                  if(sortvar == 3){
                        sortvarnow = "creation";
                  }
                  if(sortvar == 4){
                        sortvarnow = "hot";
                  }
                  if(sortvar == 5){
                        sortvarnow = "week";
                  }
                  if(sortvar == 6){
                        sortvarnow = "month";
                  }
                  sortvarstr = "sort=" + sortvarnow + "&" ; 
                  paramlist.push(sortvarstr);
            }

            function tagged(){
                  tagvar = $("#tagged").val();
                  tagvarstr = "tagged=" + tagvar + "&" ; 
                  paramlist.push(tagvarstr);
            }




           if ($("#page").val() == ""){
                  paramlist = paramlist;
                  
           }else{
                  page();

                 
            }

            if ($("#pagesize").val() == ""){
                  paramlist = paramlist;

                  
           }else{
                  pagesize();

                  
            }

                        
            if ($("#fromdate").val() == ""){
                paramlist = paramlist;
                    
                  
           }else{
                  fromdate();
                  
                  
            }

            if ($("#todate").val() == ""){
                  paramlist = paramlist;
                  
           }else{
                 todate();


           }

           if($("#order").val() == ""){

                  paramlist = paramlist;

           }else{

                  order();

           }

           if($("#min").val() == ""){

                  paramlist = paramlist;

           }else{

                  min();

           }


           if($("#max").val() == ""){

                  paramlist = paramlist;

           }else{

                  max();

           }

           if($("#sort").val() == ""){

                  paramlist = paramlist;

           }else{

                  sort();

           }

           if($("#tagged").val() == ""){

                  paramlist = paramlist;

           }else{

                  tagged();

           }

           site = "site=stackoverflow"
           paramlist.push(site)

           url = "https://api.stackexchange.com/2.2/questions?"

           for (i=0; i < paramlist.length; i++){

                  url = url + paramlist[i];
           }

           console.log(url);
           console.log(paramlist)

            

            $.ajax({

            url: url,

            dataType: 'json',

            success: function(data, status){
                  $(".datarow").empty();
                  console.log(data);
                  result = JSON.stringify(data, undefined, 4);
                  
                  $("#results").html(syntaxHighlight(result));

                  result1 = $.parseJSON(result);

                  console.log(result1.items[0].title);

                  console.log(Number(result1.items.length));

                  total = Number(result1.items.length);


                  content = "";

                  for(i=0; i<total; i++){
                    console.log(result1.items[i].title);
                    divhtml = '<div class="item' + i + '"><p>question' + i + '</p><p id="title' + i + '">' + result1.items[i].title + '</p><p id="link' + i + '">' + result1.items[i].link + '</p></div><button class="btn btn-lg" id="post' + i +'">upload' + i + '</button><p id="success' + i + '" style="color:green;"></p>'
                    
                    content = content + divhtml;

                  }

                  $(".datarow").append(content);





                  // function to upload title and link to our database when we click on upload button
                  $("button").click(function() {


                      
                      id = $(this).attr('id');
                      if(id != "run"){

                        num = id.slice(4);

                        qtitle = "#title" +num;
                        qlink = "#link" + num;

                        question = $(qtitle).html();
                        link = $(qlink).html();

                        $.post("/question/create",
                        {
                            question: question,
                            link: link,
                        },
                        function(data, status){
                            // console.log(num);
                            test = "#success" + num
                            // console.log(test)
                            // console.log(data);
                            $(test).html(data.saved);
                        });
                      }


                    });

                }

            });            
      });
});






