
INSERT INTO club(cid,cname,url,school_name,1st_area,2nd_area,category) values(1,'z','CC','z','z','z z','z')


--데이터베이스 설정입니다.

CREATE DATABASE hci;

USE hci

CREATE TABLE user(
    uid int(10) not null,
    id varchar(50) not null,
    pw varchar(50) not null,
    name varchar(20) not null,
    school_name varchar(50) not null,
    email varchar(100) not null,
    author int(2) not null,
    PRIMARY KEY(uid)
);

INSERT INTO user values(1,'admin','1234','CCManager','아주대학교','CC@clubcollector.com',2); 


CREATE TABLE club(
    cid int(10) not null,
    cname varchar(50) not null,
    url varchar(100) not null,
    school_name varchar(50) not null,
    1st_area varchar(100) not null,
    2nd_area varchar(100) not null,
    category varchar(100) not null,
    match_percent int(100),
    description varchar(400),
    PRIMARY KEY(cid)
);


CREATE TABLE club_user(
    cid int(10) not null,
    uid int(10) not null,
    author int(3) not null,
    PRIMARY KEY(cid,uid),
    FOREIGN KEY(cid) REFERENCES club(cid),
    FOREIGN KEY(uid) REFERENCES user(uid)
);


CREATE TABLE club_bbs(
    bid int(10) not null,
    cid int(10) not null,
    uid int(10) not null,
    date datetime not null,
    title varchar(200),
    content varchar(2000),
    author int(2) not null,
    PRIMARY KEY(bid),
    FOREIGN KEY(cid) REFERENCES club(cid),
    FOREIGN KEY(uid) REFERENCES user(uid)
);

CREATE TABLE club_picture(
    pid int(10) not null,
    cid int(10) not null,
    uid int(10) not null,
    date datetime not null,
    url varchar(100) not null,
    author int(2) not null,
    PRIMARY KEY(pid),
    FOREIGN KEY(cid) REFERENCES club(cid),
    FOREIGN KEY(uid) REFERENCES user(uid)
);

CREATE TABLE group(
    gid int(10) not null,
    gname varchar(100) not null,
    url varchar(500) not null,
    category varchar(1000) not null,
    PRIMARY KEY(gid)
);

CREATE TABLE group_club(
    gid int(10) not null,
    cid int(10) not null,
    PRIMARY KEY(gid,cid),
    FOREIGN KEY(gid) REFERENCES group(gid),
    FOREIGN KEY(cid) REFERENCES club(cid)
);

CREATE TABLE matching(
    mid int(10) not null,  
    mname varchar(500) not null,
    content varchar(2000),
    category varchar(200),
    1st_area varchar(100) not null,
    2nd_area varchar(100) not null,
    number int(10) not null,
    PRIMARY KEY(mid)
);


CREATE TABLE matching_list(
    mid int(10) not null,
    cid int(10) not null,
    author int(4) not null,
    partid int(10),
    PRIMARY KEY(mid,cid),
    FOREIGN KEY(mid) REFERENCES matching(mid),
    FOREIGN KEY(cid) REFERENCES club(cid)
);


CREATE TABLE bbs(
    bid int(10) not null,
    uid int(10) not null,
    date datetime not null,
    title varchar(200),
    content varchar(2000),
    author int(2) not null,
    PRIMARY KEY(bid),
    FOREIGN KEY(uid) REFERENCES user(uid)
);
