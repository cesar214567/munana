from sqlalchemy import Column, Integer, String, Sequence, DateTime, ForeignKey,func
from sqlalchemy.orm import relationship
from database import connector
import datetime





class Contacto(connector.Manager.Base):
    __tablename__ = 'contacto'
    id = Column(Integer, Sequence('contacto_id_seq'), primary_key=True)
    Username = Column(String(50), nullable=False)
    Password = Column(String(50), nullable=False)
    Nombre = Column(String(50), nullable=False)
    Telefono = Column(String(9), nullable=False)
    Correo = Column(String(120), nullable=False)
    Nombre_de_hijo = Column(String(120), nullable=True)
    Edad_de_hijo = Column(Integer, nullable=True)
    Distrito= Column(String(50),nullable=False)

# class Employee(connector.Manager.Base):
#    __tablename__ = 'employers'
#    id = Column(Integer, Sequence('employee_id_seq'), primary_key=True)
#    name = Column(String(50), nullable=False)
#    lastname = Column(String(12), nullable=False)
#    position = Column(String(12), nullable=False)
#    restaurant_id = Column(Integer, ForeignKey('restaurants.id'))
#    restaurant = relationship(Restaurant)


class Paquete(connector.Manager.Base):
    __tablename__='paquete'
    id=Column(Integer, Sequence('paquete_id_seq'), primary_key=True)
    Nombre=Column(String(35),nullable=False)
    Precio=Column(Integer,nullable=False)
    Beneficios=Column(String(180),nullable=False)


class Comentarios(connector.Manager.Base):
    __tablename__ = 'comentarios'
    id = Column(Integer, Sequence('comentarios_id_seq'), primary_key=True)
    Enviado_en = Column(DateTime,default=datetime.datetime.now())
    DisciplinaA=Column(String(35),nullable=False)
    DisciplinaB = Column(String(35), nullable=False)
    DisciplinaC = Column(String(35), nullable=True)
    Paquete_id=Column(Integer,ForeignKey('paquete.id'))
    Paquete=relationship(Paquete)
    Contacto_id= Column(Integer,ForeignKey('contacto.id'))
    Contacto=relationship(Contacto)
    Mensaje=Column(String(300),nullable=True)

class Academia(connector.Manager.Base):
    __tablename__='academia'
    id = Column(Integer, Sequence('academia_id_seq'), primary_key=True)
    Nombre=Column(String(60),nullable=False)
    Direccion=Column(String(80),nullable=False)
    Descripcion=Column(String(80),nullable=False)
    Distrito=Column(String(40),nullable=False)


class Cursos(connector.Manager.Base):
    __tablename__ = 'cursos'
    id = Column(Integer, Sequence('cursos_id_seq'), primary_key=True)
    Academia_id = Column(Integer,ForeignKey('academia.id'))
    Academia=relationship(Academia)
    Nombre_del_curso = Column(String(50), nullable=False)
    Turno = Column(String(20), nullable=False)
    Horario_Inicio = Column(Integer, nullable=False)
    Horario_Final = Column(Integer, nullable=False)
    Profesor=Column (String(50),nullable=False)

