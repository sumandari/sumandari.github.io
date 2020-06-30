---
layout: post
title: "Docker for Beginner Course Kode Kloud"
date: 2020-06-30
---

<!--excerpt.start-->
Enrolled Docker For The Absolute Beginner brought by [Kode Kloud](https://kodekloud.com/p/docker-for-the-absolute-beginner-hands-on)

This is a great course, and free!!!
<!--excerpt.end-->

Inspect the environment variables set on the running container and identify the value set to the APP_COLOR variable
```
$ docker exec c8b33d env
PATH=/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=c8b33d24552b
APP_COLOR=pink
LANG=C.UTF-8
GPG_KEY=0D96DF4D4110E5C43FBFB17F2D347EA6AA65421D
PYTHON_VERSION=3.6.6
PYTHON_PIP_VERSION=18.1
HOME=/root
```


> Run a container named blue-app using image kodekloud/simple-webapp and set the environment variable APP_COLOR to blue. Make the application available on port 38282 on the host. The application listens on port 8080.

```
$ docker run -p 38282:8080 --name blue-app -e APP_COLOR=blue -d kodekloud/simple-webapp
8ca1ab4dae30532d93b9c943fb4c81afbf94e1920d4ae162cc20c79c49b2e3f1
$ docker ps
CONTAINER ID        IMAGE                     COMMAND             CREATED             STATUS              PORTS                     NAMES
8ca1ab4dae30        kodekloud/simple-webapp   "python app.py"     11 seconds ago      Up 10 seconds       0.0.0.0:38282->8080/tcp   blue-app
c8b33d24552b        kodekloud/simple-webapp   "python app.py"     7 minutes ago       Up 7 minutes        8080/tcp                  ecstatic_feynman
```

> Deploy a mysql database using the mysql image and name it mysql-db.
> Set the database password to use db_pass123. Lookup the mysql image on Docker Hub and identify the correct environment variable to use for setting the root password.

```
$ docker run -d -e MYSQL_ROOT_PASSWORD=db_pass123 --name mysql-db mysql0b8f07ec83be70bfc2ec1356547d44d3244432227a453c98972afed72d55ffcb
$ docker exec 0b8f0 envPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=0b8f07ec83be
MYSQL_ROOT_PASSWORD=db_pass123
GOSU_VERSION=1.12
MYSQL_MAJOR=8.0
MYSQL_VERSION=8.0.20-1debian10
HOME=/root
```

> We just downloaded the code of an application. What is the base image used in the Dockerfile?
> Inspect the Dockerfile in the webapp-color directory.

```
You can either open the file using vi /root/webapp-color/Dockerfile (or using comamnds such as cat/more/less/vim e.t.c) and look for the FROM instruction or search for it directecly using grep -i FROM /root/webapp-color/Dockerfile
```

> To what location within the container is the application code copied to during a Docker build?
> Inspect the Dockerfile in the webapp-color directory.
> Open the Dockerfile and look for COPY command

> Dockerfile:

```
FROM python:3.6

RUN pip install flask

COPY . /opt/

EXPOSE 8080

WORKDIR /opt

ENTRYPOINT ["python", "app.py"]
```

> answer is /opt

> Build a docker image using the Dockerfile and name it webapp-color. No tag to be specified.

```
docker build -t webapp-color .
```

> What is the base Operating System used by the python:3.6 image?
> If required, run an instance of the image to figure it out.

```
$ docker run python:3.6 cat /etc/*release*
cat: /etc/lsb-release: No such file or directory
PRETTY_NAME="Debian GNU/Linux 10 (buster)"
NAME="Debian GNU/Linux"
VERSION_ID="10"
VERSION="10 (buster)"
VERSION_CODENAME=buster
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"
```
> answer: Debian GNU/Linux 10

> webapp-color has 924MB is too big for container, let's trim
```
vim Dockerfile
```
> change FROM python3.6 into python3.6-alpine
> build new image
```
docker build -t webapp-color:lite .
```

> Run an instance of the ubuntu image to run the sleep 1000 command at startup
> Run it in detached mode.
```
docker run -d ubuntu sleep 1000
```