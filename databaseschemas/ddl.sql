create database calciotrends
    with owner postgres;

create table public.championships
(
    competition_id       varchar(255) not null
        primary key,
    competition_code     varchar(255),
    confederation        varchar(255),
    country_id           bigint,
    country_name         varchar(255),
    domestic_league_code varchar(255),
    name                 varchar(255),
    sub_type             varchar(255),
    type                 varchar(255),
    url                  varchar(255)
);

alter table public.championships
    owner to postgres;

create table public.cti_score
(
    player_id bigint       not null
        primary key,
    score     bigint       not null,
    year      varchar(255) not null
);

alter table public.cti_score
    owner to postgres;

create table public.players
(
    player_id                            bigint not null
        primary key,
    agent_name                           varchar(255),
    city_of_birth                        varchar(255),
    contract_expiration_date             varchar(255),
    country_of_birth                     varchar(255),
    country_of_citizenship               varchar(255),
    current_club_domestic_competition_id varchar(255),
    current_club_id                      bigint,
    current_club_name                    varchar(255),
    date_of_birth                        varchar(255),
    first_name                           varchar(255),
    foot                                 varchar(255),
    height_in_cm                         integer,
    highest_market_value_in_eur          integer,
    image_url                            varchar(255),
    last_name                            varchar(255),
    last_season                          integer,
    market_value_in_eur                  integer,
    name                                 varchar(255),
    player_code                          varchar(255),
    position                             varchar(255),
    score                                real,
    sub_position                         varchar(255),
    url                                  varchar(255)
);

alter table public.players
    owner to postgres;

create table public.teams
(
    club_id                 integer not null
        primary key,
    average_age             integer,
    coach_name              varchar(255),
    club_code               varchar(255),
    domestic_competition_id varchar(255),
    foreigners_number       integer,
    foreigners_percentage   double precision,
    last_season             integer,
    name                    varchar(255),
    national_team_players   integer,
    net_transfer_record     varchar(255),
    squad_size              integer,
    stadium_name            varchar(255),
    stadium_seats           integer,
    total_market_value      integer,
    url                     varchar(255)
);

alter table public.teams
    owner to postgres;

