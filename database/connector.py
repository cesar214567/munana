from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import DeclarativeMeta
import json

class Manager:
    Base = declarative_base()
    session = None

    def createEngine(self):
        engine = create_engine('postgresql+psycopg2://kkkuqfrnlaykdf:7b34eba529008b2ad08b042846adf244856573dfbc0d7fdbc1aa7003400ef082@ec2-174-129-227-146.compute-1.amazonaws.com:5432/d2s3d19v7ruee3', echo=False)
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
