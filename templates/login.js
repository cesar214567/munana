function gotosignin() {
    window.location = "http://munana.herokuapp.com/signin";
}
function getData(){

        var username = $('#username').val();

        var password = $('#password').val();
        if (username=="" || password==""){
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
                alert(JSON.stringify(response));
                //response=JSON.stringify(response);
                console.log(response);
                if (response['status']==401){
                    console.log(response);
                }else {
                    //console.log(response);
                    if (response["message"] == "admin") {

                        var c = "http://munana.herokuapp.com/static/administrador.html";
                        window.location = c;
                    }else{
                        window.location ="http://munana.herokuapp.com/Comentario"
                    }
                }
            },
            error: function(response){
                //alert(JSON.stringify(response));
                var c="http://munana.herokuapp.com/static/administrador.html";

            }
        });
    }