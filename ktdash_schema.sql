-- SQLINES DEMO ***  Distrib 8.0.39, for Linux (x86_64)
--
-- SQLINES DEMO ***   Database: killteam
-- SQLINES DEMO *** -------------------------------------
-- SQLINES DEMO *** 0.39-0ubuntu0.20.04.1

/* SQLINES DEMO *** ARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/* SQLINES DEMO *** ARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/* SQLINES DEMO *** LLATION_CONNECTION=@@COLLATION_CONNECTION */;
/* SQLINES DEMO *** tf8mb4 */;
/* SQLINES DEMO *** ME_ZONE=@@TIME_ZONE */;
/* SQLINES DEMO *** NE='+00:00' */;
/* SQLINES DEMO *** IQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/* SQLINES DEMO *** REIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/* SQLINES DEMO *** L_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/* SQLINES DEMO *** L_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- SQLINES DEMO *** or table `Ability`
--

DROP TABLE IF EXISTS Ability;

CREATE TABLE Ability (
  factionid VARCHAR(10) NOT NULL,
  killteamid VARCHAR(50) NOT NULL,
  fireteamid VARCHAR(50) NOT NULL,
  opid VARCHAR(50) NOT NULL,
  abilityid VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  PRIMARY KEY (killteamid, fireteamid, opid, abilityid, factionid),
  CONSTRAINT FK_Ability_Operative FOREIGN KEY (factionid, killteamid, fireteamid, opid)
    REFERENCES Operative (factionid, killteamid, fireteamid, opid)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Equipment;

CREATE TABLE Equipment (
  factionid VARCHAR(10) NOT NULL,
  killteamid VARCHAR(50) NOT NULL,
  fireteamid VARCHAR(50) DEFAULT '',
  opid VARCHAR(50) DEFAULT '',
  eqid VARCHAR(50) NOT NULL,
  eqseq INT DEFAULT 0,
  eqpts VARCHAR(10) DEFAULT NULL,
  eqname VARCHAR(250) DEFAULT NULL,
  eqdescription TEXT,
  eqtype VARCHAR(45) DEFAULT NULL,
  eqvar1 VARCHAR(45) DEFAULT NULL,
  eqvar2 VARCHAR(45) DEFAULT NULL,
  eqvar3 VARCHAR(45) DEFAULT NULL,
  eqvar4 VARCHAR(45) DEFAULT NULL,
  eqcategory VARCHAR(200) DEFAULT 'Equipment',
  PRIMARY KEY (factionid, killteamid, eqid)
);

CREATE INDEX FK_Equipment_Killteam_idx ON Equipment (factionid, killteamid);

DROP TABLE IF EXISTS Event;

CREATE TABLE Event (
  eventid INT NOT NULL GENERATED ALWAYS AS IDENTITY,
  datestamp TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  sessiontype VARCHAR(50) DEFAULT '',
  userid VARCHAR(45) DEFAULT NULL,
  eventtype VARCHAR(50) DEFAULT NULL,
  action VARCHAR(45) DEFAULT NULL,
  label VARCHAR(45) DEFAULT NULL,
  var1 VARCHAR(45) DEFAULT NULL,
  var2 VARCHAR(45) DEFAULT NULL,
  var3 VARCHAR(45) DEFAULT NULL,
  url VARCHAR(500) DEFAULT '',
  userip VARCHAR(250) DEFAULT '',
  useragent VARCHAR(500) DEFAULT '',
  referrer VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (eventid)
);

ALTER SEQUENCE Event_seq RESTART WITH 16061420;

CREATE INDEX IX_TAL ON Event (userid, eventtype, action, label);
CREATE INDEX IX_VAR1 ON Event (var1, eventtype, action, label);
CREATE INDEX IX_datestamp ON Event (datestamp);
DROP TABLE IF EXISTS EventLogView;

DROP TABLE IF EXISTS Event_BKP_20240720;

CREATE TABLE Event_BKP_20240720 (
  eventid INT NOT NULL GENERATED ALWAYS AS IDENTITY,
  datestamp TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  sessiontype VARCHAR(50) DEFAULT '',
  userid VARCHAR(45) DEFAULT NULL,
  eventtype VARCHAR(50) DEFAULT NULL,
  action VARCHAR(45) DEFAULT NULL,
  label VARCHAR(45) DEFAULT NULL,
  var1 VARCHAR(45) DEFAULT NULL,
  var2 VARCHAR(45) DEFAULT NULL,
  var3 VARCHAR(45) DEFAULT NULL,
  url VARCHAR(500) DEFAULT '',
  userip VARCHAR(250) DEFAULT '',
  useragent VARCHAR(500) DEFAULT '',
  referrer VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (eventid)
);

ALTER SEQUENCE Event_BKP_20240720_seq RESTART WITH 14186874;

CREATE INDEX IX_TAL ON Event_BKP_20240720 (userid, eventtype, action, label);
CREATE INDEX IX_VAR1 ON Event_BKP_20240720 (var1, eventtype, action, label);
CREATE INDEX IX_datestamp ON Event_BKP_20240720 (datestamp);

DROP TABLE IF EXISTS Faction;

CREATE TABLE Faction (
  factionid VARCHAR(10) NOT NULL,
  seq INT DEFAULT NULL,
  factionname VARCHAR(250) DEFAULT NULL,
  description TEXT,
  PRIMARY KEY (factionid)
);
DROP TABLE IF EXISTS Fireteam;

CREATE TABLE Fireteam (
  factionid VARCHAR(10) NOT NULL,
  killteamid VARCHAR(50) NOT NULL,
  fireteamid VARCHAR(200) NOT NULL,
  seq INT DEFAULT 0,
  description TEXT,
  killteammax INT DEFAULT NULL,
  fireteamname VARCHAR(200) DEFAULT NULL,
  archetype VARCHAR(250) DEFAULT NULL,
  fireteamcomp TEXT,
  PRIMARY KEY (factionid, killteamid, fireteamid),
  CONSTRAINT FK_Fireteam_Killteam FOREIGN KEY (factionid, killteamid) 
    REFERENCES Killteam (factionid, killteamid) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE INDEX FK_Fireteam_Killteam_idx ON Fireteam (factionid, killteamid);

DROP TABLE IF EXISTS HomebrewKillteam;

CREATE TABLE HomebrewKillteam (
  userid VARCHAR(50) NOT NULL,
  seq INT DEFAULT 0,
  killteamid VARCHAR(50) NOT NULL,
  killteamname VARCHAR(250) DEFAULT NULL,
  content TEXT,
  PRIMARY KEY (userid, killteamid)
);

DROP TABLE IF EXISTS Killteam;

CREATE TABLE Killteam (
  factionid VARCHAR(10) NOT NULL,
  killteamid VARCHAR(50) NOT NULL,
  edition VARCHAR(45) DEFAULT 'kt24',
  killteamname VARCHAR(250) DEFAULT NULL,
  description TEXT,
  killteamcomp TEXT,
  customkeyword VARCHAR(250) DEFAULT '',
  PRIMARY KEY (factionid, killteamid),
  CONSTRAINT FK_Killteam_Faction FOREIGN KEY (factionid) 
    REFERENCES Faction (factionid) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE INDEX FK_Killteam_Faction_idx ON Killteam (factionid);

DROP TABLE IF EXISTS Operative;

CREATE TABLE Operative (
  factionid VARCHAR(10) NOT NULL,
  killteamid VARCHAR(50) NOT NULL,
  fireteamid VARCHAR(250) NOT NULL,
  opseq INT DEFAULT 0,
  opid VARCHAR(50) NOT NULL,
  opname VARCHAR(250) DEFAULT NULL,
  description TEXT,
  edition VARCHAR(45) DEFAULT 'kt24',
  M VARCHAR(15) DEFAULT NULL,
  APL VARCHAR(15) DEFAULT NULL,
  GA VARCHAR(15) DEFAULT NULL,
  DF VARCHAR(15) DEFAULT NULL,
  SV VARCHAR(15) DEFAULT NULL,
  W VARCHAR(15) DEFAULT NULL,
  keywords VARCHAR(4000) DEFAULT NULL,
  basesize INT DEFAULT 32,
  fireteammax INT DEFAULT 0,
  specialisms VARCHAR(50) DEFAULT '',
  PRIMARY KEY (factionid, killteamid, fireteamid, opid)
);

CREATE INDEX IX_Operative_FactionIdKillTeamIdFireTeamID ON Operative (factionid, killteamid, fireteamid);

DROP TABLE IF EXISTS Ploy;

CREATE TABLE Ploy (
  factionid VARCHAR(10) NOT NULL,
  killteamid VARCHAR(10) NOT NULL,
  ploytype VARCHAR(250) NOT NULL,
  ployid VARCHAR(50) NOT NULL,
  ployname VARCHAR(250) DEFAULT NULL,
  CP VARCHAR(10) DEFAULT NULL,
  description TEXT,
  PRIMARY KEY (factionid, killteamid, ploytype, ployid),
  CONSTRAINT FK_Ploy_Killteam FOREIGN KEY (factionid, killteamid) 
    REFERENCES Killteam (factionid, killteamid) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
DROP TABLE IF EXISTS Roster;

CREATE TABLE Roster (
  userid VARCHAR(50) NOT NULL,
  rosterid VARCHAR(50) NOT NULL,
  seq INT DEFAULT NULL,
  rostername VARCHAR(250) DEFAULT NULL,
  factionid VARCHAR(50) DEFAULT NULL,
  killteamid VARCHAR(50) DEFAULT NULL,
  notes VARCHAR(2000) DEFAULT '',
  keyword VARCHAR(250) DEFAULT '',
  TP INT DEFAULT 1,
  CP INT DEFAULT 2,
  VP INT DEFAULT 2,
  RP INT DEFAULT 0,
  spotlight INT DEFAULT 0,
  hascustomportrait INT DEFAULT 0,
  portraitcopyok INT DEFAULT 0,
  viewcount INT DEFAULT 0,
  importcount INT DEFAULT 0,
  eqids VARCHAR(250) DEFAULT '',
  ployids VARCHAR(250) DEFAULT NULL,
  tacopids VARCHAR(250) DEFAULT NULL,
  reqpts INT DEFAULT 0,
  stratnotes TEXT,
  eqnotes TEXT,
  specopnotes TEXT,
  createddate TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (userid, rosterid),
  CONSTRAINT rosterid_UNIQUE UNIQUE (rosterid),
  CONSTRAINT FK_Roster_User FOREIGN KEY (userid) REFERENCES User (userid)
);

CREATE INDEX IX_Roster_rosterid ON Roster (rosterid);

DROP TABLE IF EXISTS RosterEquipment;

CREATE TABLE RosterEquipment (
  userid VARCHAR(50) NOT NULL,
  rosterid VARCHAR(50) NOT NULL,
  eqfactionid VARCHAR(50) NOT NULL,
  eqkillteamid VARCHAR(50) NOT NULL,
  eqid VARCHAR(50) NOT NULL,
  PRIMARY KEY (userid, rosterid, eqfactionid, eqkillteamid, eqid)
);

DROP TABLE IF EXISTS RosterOperative;

CREATE TABLE RosterOperative (
  userid VARCHAR(50) NOT NULL,
  rosterid VARCHAR(50) NOT NULL,
  rosteropid VARCHAR(50) NOT NULL,
  seq INT DEFAULT NULL,
  opname VARCHAR(250) DEFAULT NULL,
  factionid VARCHAR(50) DEFAULT NULL,
  killteamid VARCHAR(50) DEFAULT NULL,
  fireteamid VARCHAR(50) DEFAULT NULL,
  opid VARCHAR(50) DEFAULT NULL,
  wepids VARCHAR(250) DEFAULT NULL,
  eqids VARCHAR(250) DEFAULT NULL,
  curW INT DEFAULT NULL,
  notes VARCHAR(2000) DEFAULT NULL,
  activated SMALLINT DEFAULT 0,
  hidden SMALLINT DEFAULT 0,
  xp INT DEFAULT 0,
  oporder VARCHAR(45) DEFAULT 'conceal',
  hascustomportrait INT DEFAULT 0,
  specialism VARCHAR(50) DEFAULT '',
  isinjured SMALLINT DEFAULT 0,
  rested INT DEFAULT 0,
  custom TEXT,
  PRIMARY KEY (userid, rosterid, rosteropid),
  CONSTRAINT rosteropid_UNIQUE UNIQUE (rosteropid),
  CONSTRAINT FK_RosterOperative_Roster FOREIGN KEY (userid, rosterid) 
    REFERENCES Roster (userid, rosterid) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE INDEX IX_RosterOperative_rosteropid ON RosterOperative (rosteropid);

DROP TABLE IF EXISTS RosterOperativeView;
DROP TABLE IF EXISTS RosterTacOp;

CREATE TABLE RosterTacOp (
  userid VARCHAR(50) NOT NULL,
  rosterid VARCHAR(50) NOT NULL,
  tacopid VARCHAR(50) NOT NULL,
  revealed SMALLINT DEFAULT 0,
  VP1 SMALLINT DEFAULT 0,
  VP2 SMALLINT DEFAULT 0,
  PRIMARY KEY (userid, rosterid, tacopid),
  CONSTRAINT FK_RosterTacOp_Roster FOREIGN KEY (userid, rosterid) 
    REFERENCES Roster (userid, rosterid) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT FK_RosterTacOp_TacOp FOREIGN KEY (tacopid) 
    REFERENCES TacOp (tacopid) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT FK_RosterTacOp_User FOREIGN KEY (userid) 
    REFERENCES User (userid) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE INDEX FK_RosterTacOp_TacOp_idx ON RosterTacOp (tacopid);
CREATE INDEX FK_RosterTacOp_User_idx ON RosterTacOp (userid);
CREATE INDEX FK_RosterTacOp_Roster_idx ON RosterTacOp (userid, rosterid);

DROP TABLE IF EXISTS RosterView;

DROP TABLE IF EXISTS RosterView_Orig;

DROP TABLE IF EXISTS Session;

CREATE TABLE Session (
  sessionid VARCHAR(50) NOT NULL,
  userid VARCHAR(50) DEFAULT NULL,
  lastactivity TIMESTAMP(0) DEFAULT NULL,
  PRIMARY KEY (sessionid),
  CONSTRAINT FK_Session_User FOREIGN KEY (userid) 
    REFERENCES User (userid) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE INDEX FK_Session_Player_idx ON Session (userid);
DROP TABLE IF EXISTS TacOp;

CREATE TABLE TacOp (
  tacopid VARCHAR(50) NOT NULL,
  edition VARCHAR(45) DEFAULT 'kt21',
  archetype VARCHAR(50) DEFAULT NULL,
  tacopseq INT DEFAULT NULL,
  title VARCHAR(50) DEFAULT NULL,
  description VARCHAR(2000) DEFAULT NULL,
  PRIMARY KEY (tacopid)
);

DROP TABLE IF EXISTS UniqueAction;

CREATE TABLE UniqueAction (
  factionid VARCHAR(10) NOT NULL,
  killteamid VARCHAR(50) NOT NULL,
  fireteamid VARCHAR(50) NOT NULL,
  opid VARCHAR(50) NOT NULL,
  uniqueactionid VARCHAR(50) NOT NULL,
  title VARCHAR(200) DEFAULT NULL,
  AP INT DEFAULT 1,
  description TEXT,
  PRIMARY KEY (factionid, killteamid, fireteamid, opid, uniqueactionid),
  CONSTRAINT FK_UniqueActions_Operative FOREIGN KEY (factionid, killteamid, fireteamid, opid) 
    REFERENCES Operative (factionid, killteamid, fireteamid, opid) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

DROP TABLE IF EXISTS User;

CREATE TABLE User (
  userid VARCHAR(50) NOT NULL,
  username VARCHAR(250) DEFAULT NULL,
  passhash VARCHAR(500) DEFAULT NULL,
  createddate TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (userid),
  CONSTRAINT username_UNIQUE UNIQUE (username)
);

DROP TABLE IF EXISTS UserSetting;

CREATE TABLE UserSetting (
  userid VARCHAR(50) NOT NULL,
  key VARCHAR(50) NOT NULL,
  value VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (userid, key),
  CONSTRAINT FK_Setting_User FOREIGN KEY (userid) 
    REFERENCES User (userid)
);

DROP TABLE IF EXISTS Weapon;

CREATE TABLE Weapon (
  factionid VARCHAR(10) NOT NULL,
  killteamid VARCHAR(50) NOT NULL,
  fireteamid VARCHAR(50) NOT NULL,
  opid VARCHAR(50) NOT NULL,
  wepid VARCHAR(50) NOT NULL,
  wepseq INT DEFAULT 0,
  wepname VARCHAR(250) DEFAULT NULL,
  weptype VARCHAR(1) DEFAULT NULL,
  isdefault SMALLINT DEFAULT 0,
  PRIMARY KEY (factionid, killteamid, fireteamid, opid, wepid)
);

CREATE INDEX FK_weapon_operative_idx ON Weapon (killteamid, fireteamid, opid);

DROP TABLE IF EXISTS WeaponProfile;

CREATE TABLE WeaponProfile (
  factionid VARCHAR(10) NOT NULL,
  killteamid VARCHAR(50) NOT NULL,
  fireteamid VARCHAR(50) NOT NULL,
  opid VARCHAR(50) NOT NULL,
  wepid VARCHAR(50) NOT NULL,
  profileid VARCHAR(200) NOT NULL,
  name VARCHAR(200) DEFAULT NULL,
  A VARCHAR(5) DEFAULT NULL,
  BS VARCHAR(5) DEFAULT NULL,
  D VARCHAR(5) DEFAULT NULL,
  SR VARCHAR(4000) DEFAULT NULL,
  PRIMARY KEY (factionid, killteamid, fireteamid, opid, wepid, profileid),
  CONSTRAINT FK_WeaponProfile_Weapon FOREIGN KEY (factionid, killteamid, fireteamid, opid, wepid) 
    REFERENCES Weapon (factionid, killteamid, fireteamid, opid, wepid) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
