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
                var c="http://www.munana.herokuapp.com/login";
                window.location=c;
                }

            },
            error: function(response){
                //alert(JSON.stringify(response));


            }
        });
}

function clearInner(node) {
  while (node.hasChildNodes()) {
    clear(node.firstChild);
  }
}

function clear(node) {
  while (node.hasChildNodes()) {
    clear(node.firstChild);
  }
  node.parentNode.removeChild(node);
  }

  function revisar_si_esta(palabra,array) {
    for (var i=0;i<array.length;i++){
        if (palabra===array[i]){
            return true;
        }
    }
  }



function getCursos(){
  // Or with jQuery

  $('.dropdown-trigger').dropdown();
    $.ajax({
            url:'/cursos',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                 //alert(JSON.stringify(response));
                 //response=JSON.stringify(response);
                var i = 0;
                var a=[];
                i=0;
                $.each(response,function () {
                    if (revisar_si_esta(response[i].Nombre_del_curso,a)){

                    }else{
                        f='<li><a href="#" onclick="Nombre1(\''+response[i].Nombre_del_curso+'\')">'+response[i].Nombre_del_curso+'</a></li><li class="divider" tabindex="-1"></li>';
                        $('#dropdown1').append(f);
                        a.push(response[i].Nombre_del_curso);
                    }
                    i=i+1;

                });
                a=[];
                i=0;
                $.each(response,function () {
                    if (revisar_si_esta(response[i].Nombre_del_curso,a)){

                    }else{
                        f='<li><a href="#" onclick="Nombre2(\''+response[i].Nombre_del_curso+'\')">'+response[i].Nombre_del_curso+'</a></li><li class="divider" tabindex="-1"></li>';
                        $('#dropdown2').append(f);
                        a.push(response[i].Nombre_del_curso);

                    }
                    i=i+1;


                });
                a=[];
                i=0;
                $.each(response,function () {
                    if (revisar_si_esta(response[i].Nombre_del_curso,a)){

                    }else{
                        f='<li><a href="#" onclick="Nombre3(\''+response[i].Nombre_del_curso+'\')">'+response[i].Nombre_del_curso+'</a></li><li class="divider" tabindex="-1"></li>';
                        $('#dropdown3').append(f);
                        a.push(response[i].Nombre_del_curso);

                    }
                    i=i+1;


                });
                f='<li id="ultimoTurno"><a href="#"  onclick="Nombre3(\'Disciplinas\')">Ninguno</a></li><li id="ultimoTurno2"class="divider" tabindex="-1"></li>';
                $('#dropdown3').append(f);


            },
            error: function(response){
                //alert(JSON.stringify(response));


            }
        });


}

function getPaquetes(){
  $('.dropdown-trigger').dropdown();
    $.ajax({
            url:'/paquetes',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                var i=0;
                var a=[];
                $.each(response,function () {
                    if (revisar_si_esta(response[i].Nombre,a)){

                    }else{
                        f='<li><a href="#" onclick="Nombre4(\''+response[i].Nombre+'\')">'+response[i].Nombre+'</a></li><li class="divider" tabindex="-1"></li>';
                        $('#dropdown4').append(f);
                        a.push(response[i].Nombre);

                    }
                    i=i+1;


                });


                f='<li id="ultimoNombre"><a href="#"  onclick="Nombre4(\'Paquetes\')">Ninguno</a></li><li id="ultimoNombre2"class="divider" tabindex="-1"></li>';
                $('#dropdown4').append(f);



            },error: function(response){

            }
    });




}

function Nombre1(xD){
    document.getElementById("dropdownn1").innerText=xD;
    document.getElementById("dropdownn1").innerHTML=xD;
}

function Nombre2(xD){
    document.getElementById("dropdownn2").innerText=xD;
    document.getElementById("dropdownn2").innerHTML=xD;

}

function Nombre3(xD){
    document.getElementById("dropdownn3").innerText=xD;
    document.getElementById("dropdownn3").innerHTML=xD;
    var element = document.getElementById("ultimoTurno");
    element.parentNode.removeChild(element);
    var element = document.getElementById("ultimoTurno2");
    element.parentNode.removeChild(element);
        var f='<li id="ultimoTurno"><a href="#"  onclick="Nombre3(\'Ninguno\')">Ninguno</a></li><li id="ultimoTurno2" class="divider" tabindex="-1"></li>';
    $('#dropdown3').append(f);

}

function Nombre4(xD){
    document.getElementById("dropdownn4").innerText=xD;
    document.getElementById("dropdownn4").innerHTML=xD;
    var element = document.getElementById("ultimoNombre");
    element.parentNode.removeChild(element);
    var element = document.getElementById("ultimoNombre2");
    element.parentNode.removeChild(element);
    var f='<li id="ultimoNombre"><a href="#"  onclick="Nombre4(\'Paquete\')">Ninguno</a></li><li id="ultimoNombre2" class="divider" tabindex="-1"></li>';
    $('#dropdown4').append(f);

}


function enviar() {
    var a =document.getElementById("dropdownn1").innerHTML;
    var b =document.getElementById("dropdownn2").innerHTML;
    var c=document.getElementById("dropdownn3").innerHTML;
    var d=document.getElementById("dropdownn4").innerHTML;
    e=document.getElementById("textarea").value;
    var text={ "DisciplinaA":a,"DisciplinaB":b,"DisciplinaC":c};
    if (d==="Paquete" || c==="Disciplina3"){
        $('#presionado').append("Por favor ingrese 1 paquete y por lo menos 2 disciplinas");
    }else{
    $.ajax({
            url:'/paquetes/'+d,
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response) {
                //alert(response);
                //alert(JSON.stringify(response));
                d = response[0].id;
                clearInner(document.getElementById("presionado"));
                text["Paquete_id"]=d;
                $.ajax({
                    url: '/current',
                    type: 'GET',
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (response) {
                        text["Contacto_id"]=response.user.id;
                        text["mensaje"]=e;

                        text=(JSON.stringify(text));

                        $.ajax({
                            url: '/Comentarioss ',
                            type: 'POST',
                            contentType: 'application/json',
                            dataType: 'json',
                            data: text,
                            success: function (response) {

                            }, error: function (response) {
                            }
                        });

                    },



                    error: function (response) {

                    },
                });

            },error: function(response){

            }
    });}}


