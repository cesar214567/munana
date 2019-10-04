FROM ubuntu:latest
MAINTAINER Jesus Bellido "cesar.madera@utec.edu.pe"
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
RUN sudo apt install libgirepository1.0-dev
RUN sudo apt-get install postgresql
RUN sudo apt-get install python-psycopg2
RUN sudo apt-get install libpq-dev
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["server.py"]
