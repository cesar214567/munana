function get_current(){
    $.ajax({
            url:'/current',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                //response=JSON.stringify(response);

                if (response["user"]!="Paulo_admin_master"){
                var c="http://munana.herokuapp.com/Login";
                window.location=c;
                }

            },
            error: function(response){
                //alert(JSON.stringify(response));


            }
        });
}

$(function(){
    var url = "http://munana.herokuapp.com/Comentarios";


    $("#grid").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "id",
            loadUrl: url ,
            insertUrl: url ,
            updateUrl: url ,
            deleteUrl: url ,
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        }),
        editing: {
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        },

        remoteOperations: true,
        paging: {
            pageSize: 12
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [8, 12, 20]
        },
        columns: [{
            dataField: "id",
            dataType: "number",
            allowEditing: false
        },  {
            dataField: "Enviado_en",
            allowEditing:false
        }, {
            dataField: "DisciplinaA",
        }, {
            dataField: "DisciplinaB",
        }
        , {
            dataField: "DisciplinaC",
        }, {
            dataField: "Paquete.Nombre",
            caption: "Paquete",
            lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "id",
                        loadUrl: "http://munana.herokuapp.com/paquetes",
                        onBeforeSend: function(method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true };
                        }
                    }),
                    displayExpr: "Nombre"
                }
      },{
            dataField: "Contacto.Nombre",
            caption: "Contacto",
            lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "id",
                        loadUrl: "http://munana.herokuapp.com/contacto",
                        onBeforeSend: function(method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true };
                        }
                    }),
                    displayExpr: "Nombre"
                }
      },{
        dataField: "Contacto.Telefono",
        caption: "Contacto",
        lookup: {
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "id",
                    loadUrl: "http://munana.herokuapp.com/contacto",
                    onBeforeSend: function(method, ajaxOptions) {
                        ajaxOptions.xhrFields = { withCredentials: true };
                    }
                }),
                displayExpr: "Telefono"
            },
            allowEditing: false
        },{
            dataField: "Contacto.Correo",
            caption: "Contacto",
            lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "id",
                        loadUrl: "http://munana.herokuapp.com/contacto",
                        onBeforeSend: function(method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true };
                        }
                    }),
                    displayExpr: "Correo    "
                },
                allowEditing: false
            },{
            dataField:"Mensaje",
            }



        ]
    }).dxDataGrid("instance");
});
