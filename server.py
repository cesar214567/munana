from flask import Flask, render_template, request, session, Response, redirect, url_for
from database import connector
from model import entities
import json
from flask_cors import CORS
from sqlalchemy import and_, or_

db = connector.Manager()
engine = db.createEngine()
cache = [[], [], [], [], [], []]
app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/static/<content>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def static_content(content):
    return render_template(content)



@app.route("/")
def home():
    return render_template('home.html')


# @app.route("/restaurantes/")
# def restaurantes():
#    if (len(cache[1])==0):
#        db_session = db.getSession(engine)
#        restaurantes = db_session.query(entities.Restaurant).all()
#        cache[1]=restaurantes
#        return render_template('restaurantes.html', restaurantes=restaurantes)
#    else:
#        return render_template('restaurantes.html', restaurantes=cache[1])

# @app.route("/personal/")
# def personal():
#    if(len(cache[2])==0):
#        db_session = db.getSession(engine)
#        employees = db_session.query(entities.Employee).order_by(entities.Employee.restaurant_id.asc()).all()
#        cache[2]=employees
#        return render_template('personal.html', employees=employees)
#   else:
#        return render_template('personal.html', employees=cache[2])
#
# @app.route("/restaurantes/<id>")
# def menu(id):
#    db_session = db.getSession(engine)
#    plates = db_session.query(entities.Plate).filter_by(restaurant_id=id).all()
#    return render_template('menu.html',plates=plates)


# CRUD--------------------------------------------------------------------------


# @app.route('/plates/<id>', methods = ['GET'])
# def get_plate_restaurant(id):
#        session = db.getSession(engine)
#        dbResponse = session.query(entities.Plate).filter(entities.Plate.restaurant_id == id)
#        data = []
#        for plate in dbResponse:
#            data.append(plate)
#        message = {'data':data}
#        return Response(json.dumps(message, cls=connector.AlchemyEncoder), mimetype='application/json')

# @app.route('/employees/<id>', methods = ['GET'])
# def get_employee_restaurant(id):
#        session = db.getSession(engine)
#        dbResponse = session.query(entities.Employee).filter(entities.Employee.restaurant_id == id)
#        data = []
#        for employee in dbResponse:
#            data.append(employee)
#        message = {'data':data}
#        return Response(json.dumps(message, cls=connector.AlchemyEncoder), mimetype='application/json')

@app.route('/contacto', methods=['GET'])
def get_contacto():
    session = db.getSession(engine)
    dbResponse = session.query(entities.Contacto)
    data = dbResponse[:]
    return Response(json.dumps(data, cls=connector.AlchemyEncoder), mimetype='application/json')

@app.route('/contacto/<data>', methods=['GET'])
def get_contacto_data(data):
    session = db.getSession(engine)
    dbResponse = session.query(entities.Contacto).filter(entities.Contacto.Username==data)
    data = dbResponse[:]
    return Response(json.dumps(data, cls=connector.AlchemyEncoder), mimetype='application/json')


@app.route('/contacto', methods=['POST'])
def create_contacto():
    c = json.loads(request.form['values'])
    print(c)
    contacto = entities.Contacto(
        Username=c['Username'],
        Password=c['Password'],
        Nombre=c['Nombre'],
        Telefono=c['Telefono'],
        Correo=c['Correo'],
        Nombre_de_hijo=c['Nombre_de_hijo'],
        Edad_de_hijo=int(c['Edad_de_hijo']),
        Distrito=c['Distrito'])
    session = db.getSession(engine)
    session.add(contacto)
    session.commit()
    return 'Created Contacto'

@app.route('/contacto3', methods=['POST'])
def create_contacto3():
    c = json.loads(request.data)
    print(c)
    contacto = entities.Contacto(
        Username=c['Username'],
        Password=c['Password'],
        Nombre=c['Nombre'],
        Telefono=c['Telefono'],
        Correo=c['Correo'],
        Nombre_de_hijo=c['Nombre_de_hijo'],
        Edad_de_hijo=int(c['Edad_de_hijo']),
        Distrito=c['Distrito'])
    session = db.getSession(engine)
    session.add(contacto)
    session.commit()
    return 'Created Contacto'

@app.route('/contacto2', methods=['POST'])
def create_contacto2():
    c = json.loads(request.data)
    contacto = entities.Contacto(
        Username=c['Username'],
        Password=c['Password'],
        Nombre=c['Nombre'],
        Telefono=c['Telefono'],
        Correo=c['Correo'],
        Distrito=c['Distrito'])
    session = db.getSession(engine)
    session.add(contacto)
    session.commit()
    return render_template('login.html')



@app.route('/contacto', methods=['PUT'])
def update_contacto():
    session = db.getSession(engine)
    id = request.form['key']
    contacto = session.query(entities.Contacto).filter(entities.Contacto.id == id).first()
    c = json.loads(request.form['values'])
    for key in c.keys():
        try:
            setattr(contacto, key, c[key])
        except AttributeError:
            setattr(contacto, 'restaurant_id', c['restaurant']['name']['id'])
    session.add(contacto)
    session.commit()
    return 'Contacto updated'


@app.route('/contacto', methods=['DELETE'])
def delete_contacto():
    id = request.form['key']
    session = db.getSession(engine)
    contacto = session.query(entities.Contacto).filter(entities.Contacto.id == id).one()
    session.delete(contacto)
    session.commit()
    return "Deleted Contacto"


@app.route('/Curso', methods=['GET'])
def get_Cursos():
    return render_template('cursos.html')


@app.route('/cursos', methods=['GET'])
def get_cursos():
    session = db.getSession(engine)
    dbResponse = session.query(entities.Cursos)
    data = []
    for restaurant in dbResponse:
        data.append(restaurant)
    message = data  # {'data':data}
    return Response(json.dumps(message, cls=connector.AlchemyEncoder), mimetype='application/json')


@app.route('/cursos/<Disciplina>/<Turno>', methods=['GET'])
def get_cursos_filtrados(Disciplina, Turno):
    session = db.getSession(engine)
    dbResponse = session.query(entities.Cursos)
    if Disciplina != "Disciplinas":
        dbResponse = dbResponse.filter(entities.Cursos.Nombre_del_curso == Disciplina)
    if Turno != "Turno":
        dbResponse = dbResponse.filter(entities.Cursos.Turno == Turno)
    data = []
    for restaurant in dbResponse:
        data.append(restaurant)
    message = data  # {'data':data}
    return Response(json.dumps(message, cls=connector.AlchemyEncoder), mimetype='application/json')

@app.route('/curso/<nombre>',methods=['GET'])
def get_cursos_filtro_academia(nombre):
    return render_template('cursos.html',message=nombre)    


@app.route('/cursos', methods=['POST'])
def create_cursos():
    c = json.loads(request.form['values'])
    cursos = entities.Cursos(
        Academia_id=c['Academia']['Nombre']['id'],
        Nombre_del_curso=c['Nombre_del_curso'],
        Turno=c['Turno'],
        Horario_Inicio=c['Horario_Inicio'],
        Horario_Final=c['Horario_Final'],
        Profesor=c['Profesor']
    )
    session = db.getSession(engine)
    session.add(cursos)
    session.commit()
    return 'Created Restaurant'


@app.route('/cursos', methods=['PUT'])
def update_cursos():
    session = db.getSession(engine)
    id = request.form['key']
    cursos = session.query(entities.Cursos).filter(entities.Cursos.id == id).first()
    c = json.loads(request.form['values'])
    for key in c.keys():
        setattr(cursos, key, c[key])
    session.add(cursos)
    session.commit()
    return 'Restaurant updated'


@app.route('/cursos', methods=['DELETE'])
def delete_cursos():
    id = request.form['key']
    session = db.getSession(engine)
    cursos = session.query(entities.Cursos).filter(entities.Cursos.id == id).one()
    session.delete(cursos)
    session.commit()
    return "Deleted Cursos"


@app.route('/Comentario', methods=['GET'])
def cargar_comentarios():
    return render_template('comentarios.html')


@app.route('/Comentarios', methods=['GET'])
def get_comentarios():
    session = db.getSession(engine)
    dbResponse = session.query(entities.Comentarios)
    data = dbResponse[:]
    return Response(json.dumps(data, cls=connector.AlchemyEncoder), mimetype='application/json')


@app.route('/Comentarios', methods=['POST'])
def create_comentarios():
    c = json.loads(request.form['values'])
    comentario = entities.Comentarios(
        DisciplinaA=c['DisciplinaA'],
        DisciplinaB=c['DisciplinaB'],
        DisciplinaC=c['DisciplinaC'],
        Paquete_id=c['Paquete_id']['Nombre']['id'],
        Contacto_id=c['Contacto_id']['Nombre']['id'],
        Mensaje=c['Mensaje']
    )
    session = db.getSession(engine)
    session.add(comentario)
    session.commit()
    return 'Created Plate'

@app.route('/Comentarioss', methods=['POST'])
def create_comentarioss():
    c = json.loads(request.data)
    comentario = entities.Comentarios(
        DisciplinaA=c['DisciplinaA'],
        DisciplinaB=c['DisciplinaB'],
        DisciplinaC=c['DisciplinaC'],
        Paquete_id=c['Paquete_id'],
        Contacto_id=c['Contacto_id'],
        Mensaje=c['mensaje']

    )
    session = db.getSession(engine)
    session.add(comentario)
    session.commit()
    return 'Created Plate'



@app.route('/Comentarios', methods=['PUT'])
def update_comentarios():
    session = db.getSession(engine)
    id = request.form['key']
    comentarios = session.query(entities.Comentarios).filter(entities.Comentarios.id == id).first()
    c = json.loads(request.form['values'])
    for key in c.keys():
        setattr(comentarios, key, c[key])
    session.add(comentarios)
    session.commit()
    return 'Comentarios updated'


@app.route('/Comentarios', methods=['DELETE'])
def delete_comentarios():
    id = request.form['key']
    session = db.getSession(engine)
    comentarios = session.query(entities.Comentarios).filter(entities.Comentarios.id == id).one()
    session.delete(comentarios)
    session.commit()
    return "Deleted Comentarios"


@app.route('/paquetes', methods=['GET'])
def get_paquetes():
    session = db.getSession(engine)
    dbResponse = session.query(entities.Paquete)
    data = dbResponse[:]
    return Response(json.dumps(data, cls=connector.AlchemyEncoder), mimetype='application/json')


@app.route('/paquetes/<nombre>', methods=['GET'])
def get_paquetes_with_nombre(nombre):
    session = db.getSession(engine)
    dbResponse = session.query(entities.Paquete).filter(entities.Paquete.Nombre == nombre)
    data = dbResponse[:]
    return Response(json.dumps(data, cls=connector.AlchemyEncoder), mimetype='application/json')


@app.route('/Paquete', methods=['GET'])
def get_paquete():
    session = db.getSession(engine)
    dbResponse = session.query(entities.Paquete)
    data = dbResponse[:]
    return render_template('paquetes.html', data=data)


@app.route('/paquetes', methods=['POST'])
def create_paquetes():
    c = json.loads(request.form['values'])
    paquete = entities.Paquete(
        Nombre=c['Nombre'],
        Precio=c['Precio'],
        Beneficios=c['Beneficios']
    )
    session = db.getSession(engine)
    session.add(paquete)
    session.commit()
    return 'Created Plate'


@app.route('/paquetes', methods=['PUT'])
def update_paquete():
    session = db.getSession(engine)
    id = request.form['key']
    paquete = session.query(entities.Paquete).filter(entities.Paquete.id == id).first()
    c = json.loads(request.form['values'])
    for key in c.keys():
        setattr(paquete, key, c[key])
    session.add(paquete)
    session.commit()
    return 'Paquete updated'


@app.route('/paquetes', methods=['DELETE'])
def delete_paquete():
    id = request.form['key']
    session = db.getSession(engine)
    paquete = session.query(entities.Paquete).filter(entities.Paquete.id == id).one()
    session.delete(paquete)
    session.commit()
    return "Deleted Paquete"


@app.route('/academias', methods=['GET'])
def get_academia():
    session = db.getSession(engine)
    dbResponse = session.query(entities.Academia)
    data = dbResponse[:]
    return Response(json.dumps(data, cls=connector.AlchemyEncoder), mimetype='application/json')


@app.route('/Academias', methods=['GET'])
def get_Academias():
    session = db.getSession(engine)
    dbResponse = session.query(entities.Academia)
    return render_template('academias.html', academias=dbResponse)


@app.route('/academias', methods=['POST'])
def create_academia():
    c = json.loads(request.form['values'])
    academia = entities.Academia(
        Nombre=c['Nombre'],
        Direccion=c['Direccion'],
        Descripcion=c['Descripcion'],
        Distrito=c['Distrito'],
        Geo_x=c['Geo_x'],
        Geo_y=c['Geo_y']
    )
    session = db.getSession(engine)
    session.add(academia)
    session.commit()
    return 'Created academia'


@app.route('/academias', methods=['PUT'])
def update_academia():
    session = db.getSession(engine)
    id = request.form['key']
    academia = session.query(entities.Academia).filter(entities.Academia.id == id).first()
    c = json.loads(request.form['values'])
    for key in c.keys():
        setattr(academia, key, c[key])
    session.add(academia)
    session.commit()
    return 'academias updated'


@app.route('/academias', methods=['DELETE'])
def delete_academia():
    id = request.form['key']
    session = db.getSession(engine)
    academia = session.query(entities.Academia).filter(entities.Academia.id == id).one()
    session.delete(academia)
    session.commit()
    return "Deleted academia"


# CRUD-----------------------------------------------------------------------


@app.route('/authenticate', methods=["POST"])
def authenticate():
    message = json.loads(request.data)
    username = message['username']
    password = message['password']
    if username == "Paulo_admin_master" and password == "hola":
        message = {'message': 'admin'}
        cache[0] = username
        cache[1] = password
        return Response(json.dumps(message, cls=connector.AlchemyEncoder), status=200, mimetype='application/json')
    else:
        if (cache[0] == username and cache[1] == password):
            db_session = db.getSession(engine)
            user = db_session.query(entities.Contacto).filter(
                and_(entities.Contacto.Username == username, entities.Contacto.Password == password))
            message = {'message': 'Authorized', 'user': user}
            return Response(json.dumps(message, cls=connector.AlchemyEncoder), status=200, mimetype='application/json')
        else:
            db_session = db.getSession(engine)
            users = db_session.query(entities.Contacto)
            for user in users:
                if user.Username == username and user.Password == password:
                    message = {'message': 'Authorized', 'user': user}
                    cache[0] = user
                    cache[1] = password 
                    return Response(json.dumps(message, cls=connector.AlchemyEncoder), status=200,mimetype='application/json')
            message = {'message': 'Unauthorized'}
            return Response(message, status=401, mimetype='application/json')


@app.route('/current', methods=["GET"])
def current_user():
    db_session = db.getSession(engine)
    if cache[0] != [] and cache[0] != "":
        message = {'message': 'Authorized', 'user': cache[0]}
        return Response(json.dumps(message, cls=connector.AlchemyEncoder), status=200, mimetype='application/json')
    message = {'message': 'Unauthorized'}
    return Response(json.dumps(message, cls=connector.AlchemyEncoder), status=200, mimetype='application/json')


@app.route('/logout', methods=["GET"])
def logout():
    session.clear()
    return render_template('home.html')

@app.route('/Login')
def login():
    return render_template('login.html')

@app.route('/login')
def login2():
    return render_template('login.html')

@app.route('/signin')
def signin():
    return render_template('signin.html')

if __name__ == '__main__':
    app.secret_key = ".."
    app.run(port=8080, threaded=True, host=('127.0.0.1'))

    
