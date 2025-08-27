ALTER DATABASE hotelskabaza SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE hotelskabaza COLLATE Latin1_General_100_CI_AI_SC_UTF8;
GO
ALTER DATABASE hotelskabaza SET MULTI_USER;
GO


create table operateri(
sifra int not null primary key identity(1,1),
email varchar(50) not null,
lozinka varchar(200) not null
);

-- Lozinka hotelskaapp generirana pomoću https://bcrypt-generator.com/
insert into operateri values ('hotel@hotel.hr',
'$2a$12$L19d5YJgQOVDHJJc97JlPeROXA9.1QCiSgXe.TtTuoPFIzuTP/MSO');



create table smjestaji(
sifra int not null primary key identity(1,1),
naziv varchar(50) not null,
cijena decimal(18,2) null, 
datumod datetime, 
datumdo datetime, 
aktivan bit not null default 0,
);


create table rezervacije(
sifra int not null primary key identity(1,1),
ime varchar(50) not null,
prezime varchar(50) not null,
email varchar(100),
smjestaj int not null references smjestaji(sifra)
);




insert into smjestaji (naziv,cijena,datumod,datumdo,aktivan)
values 
('Deluxe Apartman',1200.54,'2025-06-16 14:00:00','2025-06-25 11:00:00',1),
('Apartman',1100.20,'2025-04-16 14:00:00','2025-04-25 11:00:00',1),
('Soba',1400.55,'2025-05-16 14:00:00','2025-05-25 11:00:00',1);



insert into rezervacije (ime, prezime, email, smjestaj) values
('Gavran','Gavran','barbaragavran67@gmail.com', 1),
('Šteko','Ivan','ivan.steko5@gmail.com', 2),
('Jaklić','Bruno','bruno.jaklic.2005@gmail.com', 3),
('Sarkić','Hristina','Hristinasarkic@gmail.com', 3),
('Petrač','Darijan','darijan.petrac@gmail.com', 2);




















