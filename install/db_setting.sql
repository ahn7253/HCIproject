


--데이터베이스 설정입니다.

CREATE DATABASE hci;

CREATE TABLE user(
    id varchar(50) not null,
    pw varchar(50) not null,
    name varchar(20) not null,
    school_name varchar(50) not null,
    email varchar(100) not null,
    PRIMARY KEY(id)
);