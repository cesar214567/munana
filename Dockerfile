FROM ubuntu:latest
MAINTAINER Jesus Bellido "cesar.madera@utec.edu.pe"
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
RUN apt install libgirepository1.0-dev
RUN apt-get install postgresql
RUN apt-get install python-psycopg2
RUN apt-get install libpq-dev
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["server.py"]
