function returnToLogin() {
    window.location="http://munana.herokuapp.com/Login"
}
function nombre(value){
    document.getElementById("distrito").innerText=value;
    document.getElementById("distrito").innerHTML=value
}

function PostContacto(){
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    var nombre=document.getElementById("nombre").value;
    var telefono=document.getElementById("telefono").value;
    var correo=document.getElementById("email").value;
    var nombre_de_hijo=document.getElementById("nombre_de_hijo").value;
    var edad_de_hijo=document.getElementById("edad_de_hijo").value;
    var Distrito=document.getElementById("distrito").innerText;
    var text={ "Username":username,"Password":password,"Nombre":nombre,"Telefono":telefono,"Correo":correo,"Nombre_de_hijo":nombre_de_hijo,"Edad_de_hijo":edad_de_hijo,"Distrito":Distrito};
    text=JSON.stringify(text);
    if (username==="" || password==="" || nombre==="" || telefono==="" || correo==="" || Distrito==="DISTRITO"){
        document.getElementById("alarma").innerText="porfavor rellene todos los campos obligatorios";
        return;
    }
    if(nombre_de_hijo=="" && edad_de_hijo=="") {
        $.ajax({
            url: '/contacto/' + username,
            type: 'GET',
            success: function (response) {
                //alert(JSON.stringify(response));
                //response=JSON.stringify(response);
                if (response.length === 0) {
                    $.ajax({
                        url: '/contacto2',
                        type: 'POST',
                        contentType: 'application/json',
                        data: text,
                        dataType: 'json',
                        success: function (response) {
                            //alert(JSON.stringify(response));
                            //response=JSON.stringify(response);

                        },
                        error: function (response) {
                        }
                    })
                } else {
                    document.getElementById("alarma").innerText = "el username ya esta siendo usado";
                    return;
                }
                window.location = "http://munana.herokuapp.com/Login";
            },
            error: function (response) {
            }
        });
    }else{
        document.getElementById("alarma").innerText="Se le olvido poner el nombre o la edad de su hijo";
        return;
    }





    }
