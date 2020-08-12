use test;
CREATE TABLE public.usuario
(
    nombre_user character(100) COLLATE pg_catalog."default",
    apellido_user character(100) COLLATE pg_catalog."default",
    cedula_user character(100) COLLATE pg_catalog."default",
    fechanac_user date,
    codigo_user integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    mail_user character(100) COLLATE pg_catalog."default",
    CONSTRAINT usuario_pkey PRIMARY KEY (codigo_user)
)

TABLESPACE pg_default;

ALTER TABLE public.usuario
    OWNER to postgres;

CREATE OR REPLACE PROCEDURE public.saveusr(
	nombre character,
	apellido character,
	cedula character,
	nac date,
	mail character)
LANGUAGE 'plpgsql'
AS $BODY$
begin 
insert into usuario (nombre_user, apellido_user, cedula_user, fechanac_user, mail_user) values (nombre, apellido, cedula, nac, mail);
end;$BODY$;