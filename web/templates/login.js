function gotosignin() {
    window.location = "munana.herokuapp.com/signin";
}
function getData(){

        var username = $('#username').val();

        var password = $('#password').val();
        if (username==="" || password===""){
            //alert("introducir password o contraseña")
            document.getElementById("alarma").innerText="Introducir usuario y contraseña"
        }
        var message = JSON.stringify({
                "username": username,
                "password": password
            });
        console.log(message);
        $.ajax({
            url:'/authenticate',
            type:'POST',
            contentType: 'application/json',
            data : message,
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                //response=JSON.stringify(response);
                //console.log(response);
                if (response['status']==401){

                }else {
                    //console.log(response);
                    if (response["message"] == "admin") {

                        var c = "munana.herokuapp.com/static/administrador.html";
                        window.location = c;
                    }else{
                        window.location ="munana.herokuapp.com/Comentario"
                    }
                }
            },
            error: function(response){
                //alert(JSON.stringify(response));
                var c="munana.herokuapp.com/static/administrador.html";

            }
        });
    }