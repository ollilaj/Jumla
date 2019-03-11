create database jumla;
use jumla;

create table user (id int not null auto_increment, username varchar(255) not null, salt varchar(255) not null, hash varchar(255) not null, primary key(id));
create table celebrity (id int not null auto_increment, name varchar(255) not null, twitterHandle varchar(255) not null, primary key(id));
create table follows (userId int not null, celebrityId int not null, foreign key (userId) references user(id), foreign key (celebrityId) references celebrity(id));

insert into celebrity (name, twitterHandle)
values
("Adele", "adele"),
("Ariana Grande", "arianagrande"),
("Bella Hadid", "bellahadid"),
("Beyonce", "beyonce"),
("Bruno Mars", "brunomars"),
("Cara Delevingne", "caradelevingne"),
("Chance the Rapper", "chancetherapper"),
("Dan Bilzerian", "danbilzerian"),
("Drake", "drake"),
("Ed Sheeran", "edsheeran"),
("Elon Musk", "elonmusk"),
("Eminem", "eminem"),
("Emma Watson", "emmawatson"),
("Floyd Mayweather", "floydmayweather"),
("Gigi Hadid", "gigihadid"),
("Jennifer Lopez", "jlo"),
("Jimmy Fallon", "jimmyfallon"),
("Justin Bieber", "justinbieber"),
("Justin Timberlake", "jtimberlake"),
("Katy Perry", "katyperry"),
("Kendall Jenner", "kendalljenner"),
("Kevin Hart", "kevinhart4real"),
("Kim Kardashian", "kimkardashian"),
("Kylie Jenner", "kyliejenner"),
("Lady Gaga", "ladygaga"),
("Leonardo DiCaprio", "leodicaprio"),
("Mariah Carey", "mariahcarey"),
("Miley Cyrus", "mileycyrus"),
("Nicki Minaj", "nickiminaj"),
("P!nk", "pink"),
("Rihanna", "rihanna"),
("Selena Gomez", "selenagomez"),
("Shakira", "shakira"),
("Snoop Dogg", "snoopdogg"),
("Taylor Swift",  "taylorswift13"),
("Vanessa Hudgens", "vanessahudgens"),
("Zac Efron", "zacefron"),
("Zendaya", "zendaya");
