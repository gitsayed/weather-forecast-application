# Realtime Online Weather Forecast Application

This project was developed with Java-SpringBoot framework version 3.3.0 for backend module and PostgreSQL version 14.12 for Database storage.

## Technologies are used in this project.

* Java - JDK-17.0.7 2023-04-18 LTS @(build 17.0.7+8-LTS-224)
* Maven version 3.9.6
* SpringBoot version 3.3.0
* JWT Authentication & Authorization
* PostgreSQL Database version 14.12


## How to setup this project.

To setup this project steps are as follows:

* At first clone the project your machine.

#### Database part

* Download PostgreSQL and install it on your machine.
* Start PostgreSQL server on your machine and create a database by name `testdb`. You can create database in other name then you have to declare that on backend module SpringBoot properties file
    * Execute the SQL scripts following:
      ` CREATE TABLE IF NOT EXISTS public.roles ( id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),  name character varying(20) COLLATE pg_catalog."default",  CONSTRAINT roles_pkey PRIMARY KEY (id)
      );
      INSERT INTO public.roles(	id, name)	VALUES (1, 'ROLE_ADMIN');
      INSERT INTO public.roles(	id, name)	VALUES (2, 'ROLE_USER');
      INSERT INTO public.roles(	id, name)	VALUES (3, 'ROLE_MODERATOR');
      INSERT INTO public.roles(	id, name)	VALUES (4, 'ROLE_READ');
      INSERT INTO public.roles(	id, name)	VALUES (5, 'ROLE_WRITE');
      INSERT INTO public.roles(	id, name)	VALUES (6, 'ROLE_UPDATE');
      INSERT INTO public.roles(	id, name)	VALUES (7, 'ROLE_DELETE');
      INSERT INTO public.roles(	id, name)	VALUES (8, 'ROLE_REPORT'); `

#### Main Project part

* Download required Java_JDK on your machine which version mentioned above. And install the Java_JDK on your machine according to your Machine Operating System.
* Then download Maven mentioned above and install it on your machine.
* Go to this backend directory `/weather-forecast-application/WeatherApplication-backend`
* Open a CMD terminal and run this command `mvn clean ` and wait some moments until your terminal shows this message `BUILD SUCCESS`
* Next run this command `mvn spring-boot:run`
* Check if this message appears in your terminal `Tomcat started on port 7070 (http) with context path '/weather'`
* Or, you can define your own port number. For that you must be declared of your port in this file `/weather-forecast-application/WeatherApplication-backend/src/main/resources/application.properties` in `server.port=` area
* Now your backend Weather forecasting application is running successfully.

### Developed APIs

* `"/weather/v1/auth/signup"`, Method `POST`
* `"/weather/v1/auth/signin"`, Method `POST`
* `"/weather/v1/auth/refresh_token"`, Method `POST`
* `"/weather/v1/favourite/location"`, Method `POST`
* `"/weather/v1/favourite/location"`, Method `POST`
* `"/weather/v1/favourite/location"`, Method `GET`
* `"/weather/v1/favourite/locations"`, Method `GET`
* `"/weather/v1/geo/location"`, Method `GET`
* `"/weather/v1/geo/location"`, Method `GET`
* `"/weather/v1/geo/daily-weather-forecast"`, Method `GET`
* `"/weather/v1/geo/hourly-weather-forecast"`, Method `GET`