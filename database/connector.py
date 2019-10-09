from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import DeclarativeMeta
import json

class Manager:
    Base = declarative_base()
    session = None

    def createEngine(self):
        engine = create_engine('postgresql+psycopg2://iconldfazktkhe:7720c5288f07b8ce321644c44c7e39955c7410f64925b74202ddc2ff20d5c16a@ec2-54-221-212-126.compute-1.amazonaws.com:5432/d5dvln9q2ts163', echo=False)
        self.Base.metadata.create_all(engine)
        return engine

    def getSession(self, engine):
        if self.session == None:
            Session = sessionmaker(bind=engine)
            session = Session()

        return session


class AlchemyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    if isinstance(data.__class__, DeclarativeMeta):
                        _obj = AlchemyEncoder.default(self, data)
                        json.dumps(_obj)
                        fields[field] = _obj
                    else:
                        json.dumps(data)
                        fields[field] = data
                except TypeError:
                    fields[field] = str(data)

            return fields

        return json.JSONEncoder.default(self, obj)
