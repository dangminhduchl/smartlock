create table USERS(
	ID serial primary key, 
	username varchar(25) unique not null,
	password varchar(25) not null,
	role int,
	createat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
)
select * from users where username = 'admin'
insert into USERS(username,password) values ('duc','123456')

create table Activity(
	ID int,
	activity_desc int,
	activity_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
	constraint fk_id foreign key(id) references users(id)
)

drop table request
drop table USERS

select * from users
