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
                var c="http://www.munana.herokuapp.com/Login";
                window.location=c;
                }

            },
            error: function(response){
                //alert(JSON.stringify(response));


            }
        });
}

$(function(){
    var url = "http://www.munana.herokuapp.com/contacto";


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
        },{
            dataField:"Username"
        },{
            dataField:"Password"
        },{
            dataField: "Nombre"
        }, {
            dataField: "Telefono"
        }, {
            dataField: "Correo"
        }, {
            dataField: "Nombre_de_hijo",

        }, {
            dataField:"Edad_de_hijo",
            dataType: "number"
        },{
            dataField:"Distrito"
        },
            /*{
            dataField: "restaurant.name",
            caption: "Restaurant from",
            lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "id",
                        loadUrl: "http://www.munana.herokuapp.com/restaurants",
                        onBeforeSend: function(method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true };
                        }
                    }),
                    displayExpr: "id"
                }
                */

      ]
    }).dxDataGrid("instance");
});
