FROM python:3.8

ENV HOME=/usr/src
ENV APP_HOME=$HOME/app/

WORKDIR $HOME

COPY ./app ./app

WORKDIR $APP_HOME

RUN apt-get update
RUN apt-get install -y --no-install-recommends
RUN rm -rf /var/lib/apt/lists/* 

RUN apt-get install -y apt-transport-https
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/9/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update
RUN ACCEPT_EULA=Y apt-get install msodbcsql17 unixodbc-dev -y

RUN pip install -r requirements.txt

RUN python manage.py makemigrations 
RUN python manage.py migrate 
RUN python manage.py collectstatic --noinput 

EXPOSE 8000