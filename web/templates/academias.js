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
                var c="munana.herokuapp.com/login";
                window.location=c;
                }else{
                var c="munana.herokuapp.com/Comentario";
                window.location=c;
                }

            },
            error: function(response){
                //alert(JSON.stringify(response));


            }
        });
}