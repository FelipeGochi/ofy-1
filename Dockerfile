FROM python:3.8

ENV HOME=/usr/src
ENV APP_HOME=$HOME/app/

WORKDIR $HOME

COPY ./app ./app

WORKDIR $APP_HOME

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* 

RUN apt-get update && \
    apt-get install -y apt-transport-https && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/9/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install msodbcsql17 unixodbc-dev -y

RUN pip install -r requirements.txt

EXPOSE 8000