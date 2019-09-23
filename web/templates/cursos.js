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



function getAll(nombre){
  // Or with jQuery
    if (nombre!=""){
        getPorAcademia(nombre);
    }else{

    
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
                 $.each(response,function () {
                     f='<tr><td><div class="blanco">'+response[i].Academia.Nombre+'</div></td><td><div class="blanco">'+response[i].Nombre_del_curso +'</div></td><td><div class="blanco">'+response[i].Turno+'</div></td><td><div class="blanco">'+response[i].Horario_Inicio+'</div></td><td><div class="blanco">'+response[i].Horario_Final+'</div></td><td><div class="blanco">'+response[i].Profesor+'</div></td></tr>'
                     $('#tabla').append(f);
                     i=i+1

                 });
                i=0;
                $.each(response,function () {
                    if (revisar_si_esta(response[i].Nombre_del_curso,a)){

                    }else{
                        f='<li><a href="#" onclick="Disciplina(\''+response[i].Nombre_del_curso+'\')">'+response[i].Nombre_del_curso+'</a></li><li class="divider" tabindex="-1"></li>';
                        $('#dropdown1').append(f);
                        a.push(response[i].Nombre_del_curso);
                    }
                    i=i+1;

                });
                a=[];
                i=0;
                $.each(response,function () {
                    if (revisar_si_esta(response[i].Academia.Distrito,a)){

                    }else{
                        f='<li><a href="#" onclick="Distrito(\''+response[i].Academia.Distrito+'\')">'+response[i].Academia.Distrito+'</a></li><li class="divider" tabindex="-1"></li>';
                        $('#dropdown2').append(f);
                        a.push(response[i].Academia.Distrito);

                    }
                    i=i+1;


                })
                a=[];
                i=0;
                $.each(response,function () {
                    if (revisar_si_esta(response[i].Academia.Nombre,a)){

                    }else{
                        f='<li><a href="#" onclick="Nombre(\''+response[i].Academia.Nombre+'\')">'+response[i].Academia.Nombre+'</a></li><li class="divider" tabindex="-1"></li>';
                        $('#dropdown4').append(f);
                        a.push(response[i].Academia.Nombre);

                    }
                    i=i+1;


                })

                f='<li id="ultimoTurno"><a href="#"  onclick="Turno(\'Turno\')">Ninguno</a></li><li id="ultimoTurno2" class="divider" tabindex="-1"></li>';
                $('#dropdown3').append(f);
                f='<li id="ultimoDisciplina"><a href="#"  onclick="Disciplina(\'Disciplinas\')">Ninguno</a></li><li id="ultimoDisciplina2" class="divider" tabindex="-1"></li>';
                $('#dropdown1').append(f);
                f='<li id="ultimoDistrito"><a href="#"  onclick="Distrito(\'Distrito\')">Ninguno</a></li><li id="ultimoDistrito2"class="divider" tabindex="-1"></li>';
                $('#dropdown2').append(f);
                f='<li id="ultimoNombre"><a href="#"  onclick="Nombre(\'Nombre\')">Ninguno</a></li><li id="ultimoNombre2"class="divider" tabindex="-1"></li>';
                $('#dropdown4').append(f);


            },
            error: function(response){
                //alert(JSON.stringify(response));


            }
        });


}
}
function Disciplina(xD){
    document.getElementById("dropdownn1").innerText=xD;
    document.getElementById("dropdownn1").innerHTML=xD;
    var element = document.getElementById("ultimoDisciplina");
    element.parentNode.removeChild(element);
    var element = document.getElementById("ultimoDisciplina2");
    element.parentNode.removeChild(element);
    var f='<li id="ultimoDisciplina"><a href="#" onclick="Disciplina(\'Disciplinas\')">Ninguno</a></li><li id="ultimoDisciplina2" class="divider" tabindex="-1"></li>';
    $('#dropdown1').append(f);
}

function Distrito(xD){
    document.getElementById("dropdownn2").innerText=xD;
    document.getElementById("dropdownn2").innerHTML=xD;
    var element = document.getElementById("ultimoDistrito");
    element.parentNode.removeChild(element);
    var element = document.getElementById("ultimoDistrito2");
    element.parentNode.removeChild(element);
    var f='<li id="ultimoDistrito"><a href="#" onclick="Distrito(\'Distrito\')">Ninguno</a></li><li id="ultimoDistrito2" class="divider" tabindex="-1"></li>';
    $('#dropdown2').append(f);

}

function Turno(xD){
    document.getElementById("dropdownn3").innerText=xD;
    document.getElementById("dropdownn3").innerHTML=xD;
    var element = document.getElementById("ultimoTurno");
    element.parentNode.removeChild(element);
    var element = document.getElementById("ultimoTurno2");
    element.parentNode.removeChild(element);
    var f='<li id="ultimoTurno"><a href="#"  onclick="Turno(\'Turno\')">Ninguno</a></li><li id="ultimoTurno2" class="divider" tabindex="-1"></li>';
    $('#dropdown3').append(f);

}

function Nombre(xD){
    document.getElementById("dropdownn4").innerText=xD;
    document.getElementById("dropdownn4").innerHTML=xD;
    var element = document.getElementById("ultimoNombre");
    element.parentNode.removeChild(element);
    var element = document.getElementById("ultimoNombre2");
    element.parentNode.removeChild(element);
    var f='<li id="ultimoNombre"><a href="#"  onclick="Nombre(\'Academias\')">Ninguno</a></li><li id="ultimoNombre2" class="divider" tabindex="-1"></li>';
    $('#dropdown4').append(f);

}


function Filtrar() {
    var a =document.getElementById("dropdownn1").innerHTML;
    var b =document.getElementById("dropdownn2").innerHTML;
    var c=document.getElementById("dropdownn3").innerHTML;
    var d=document.getElementById("dropdownn4").innerHTML;
    $.ajax({
            url:'/cursos/'+a+'/'+c,
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response) {

                //alert(JSON.stringify(response));
                //response=JSON.stringify(response);
                clearInner(document.getElementById('tabla'));
                var i = 0;
                var a=[];

                if (b!=="Distrito" ) {
                    $.each(response, function () {
                        if (response[i].Academia.Distrito !== b) {
                            response[i] = null;
                        }
                        i = i + 1;


                    });
                }

                if (d!=="Academias"){
                    i = 0;
                    $.each(response,function () {
                     if (response[i].Academia.Nombre!==d){

                         response[i]=null;
                     }i=i+1;



                 })

                }

                i=0;
                $.each(response,function () {

                    if (response[i]!==null){
                        f='<tr><td><div class="blanco">'+response[i].Academia.Nombre+'</div></td><td><div class="blanco">'+response[i].Nombre_del_curso +'</div></td><td><div class="blanco">'+response[i].Turno+'</div></td><td><div class="blanco">'+response[i].Horario_Inicio+'</div></td><td><div class="blanco">'+response[i].Horario_Final+'</div></td><td><div class="blanco">'+response[i].Profesor+'</div></td></tr>'
                    $('#tabla').append(f);

                    }
                    i=i+1;



                 });




            },
        error: function(response){
                //alert(JSON.stringify(response));


            }



    })
}

function getPorAcademia(nombre) {
    var a =document.getElementById("dropdownn1").innerHTML;
    var b =document.getElementById("dropdownn2").innerHTML;
    var c=document.getElementById("dropdownn3").innerHTML;
    var d=document.getElementById("dropdownn4").innerHTML;
    $.ajax({
            url:'/cursos/'+a+'/'+c,
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response) {
                
                //alert(JSON.stringify(response));
                //response=JSON.stringify(response);
                clearInner(document.getElementById('tabla'));
                var i = 0;
                var a=[];
                $.each(response,function () {
                    if (response[i].Academia.Nombre!=nombre){
                        response[i]=null;
                    }
                    i=i+1;
                 })

                i=0;
                $.each(response,function () {

                    if (response[i]!==null){
                        f='<tr><td><div class="blanco">'+response[i].Academia.Nombre+'</div></td><td><div class="blanco">'+response[i].Nombre_del_curso +'</div></td><td><div class="blanco">'+response[i].Turno+'</div></td><td><div class="blanco">'+response[i].Horario_Inicio+'</div></td><td><div class="blanco">'+response[i].Horario_Final+'</div></td><td><div class="blanco">'+response[i].Profesor+'</div></td></tr>'
                    $('#tabla').append(f);

                    }
                    i=i+1;



                 });




            },
        error: function(response){
                //alert(JSON.stringify(response));


            }



    })
}