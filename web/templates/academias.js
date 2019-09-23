function get_current(){
    $.ajax({
            url:'/current',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                //response=JSON.stringify(response);

                if (response["message"]=="Unauthorized"){
                var c="http://127.0.0.1:8080/login";
                window.location=c;
                }else{
                var c="http://127.0.0.1:8080/Comentario";
                window.location=c;
                }

            },
            error: function(response){
                //alert(JSON.stringify(response));


            }
        });
}