SELECT
  `R`.`userid` AS `userid`,
  `U`.`username` AS `username`,
  `R`.`rosterid` AS `rosterid`,
  `R`.`seq` AS `seq`,
  `R`.`rostername` AS `rostername`,
  `R`.`notes` AS `notes`,
  `R`.`factionid` AS `factionid`,
  `R`.`killteamid` AS `killteamid`,
  `R`.`hascustomportrait` AS `hascustomportrait`,
  `R`.`TP` AS `TP`,
  `R`.`CP` AS `CP`,
  `R`.`VP` AS `VP`,
  `R`.`RP` AS `RP`,
  `R`.`ployids` AS `ployids`,
  `R`.`tacopids` AS `tacopids`,
  `R`.`spotlight` AS `spotlight`,
  `F`.`factionname` AS `factionname`,
  `K`.`killteamname` AS `killteamname`,
  `K`.`description` AS `killteamdescription`,
  GROUP_CONCAT(
    DISTINCT (
      CASE
        `RO`.`opcount`
        WHEN 1 THEN `RO`.`optype`
        ELSE concat(`RO`.`opcount`, ' ', `RO`.`optype`)
      END
    )
    ORDER BY
      `RO`.`firstseq` ASC SEPARATOR ', '
  ) AS `oplist`,
  `R`.`viewcount` AS `viewcount`,
  `R`.`importcount` AS `importcount`
FROM
  (
    (
      (
        (
          `ktdash`.`Roster` `R`
          JOIN `ktdash`.`User` `U` ON((`U`.`userid` = `R`.`userid`))
        )
        JOIN `ktdash`.`Faction` `F` ON((`F`.`factionid` = `R`.`factionid`))
      )
      JOIN `ktdash`.`Killteam` `K` ON(
        (
          (`K`.`factionid` = `R`.`factionid`)
          AND (`K`.`killteamid` = `R`.`killteamid`)
        )
      )
    )
    LEFT JOIN (
      SELECT
        `ktdash`.`RosterOperative`.`userid` AS `userid`,
        `ktdash`.`RosterOperative`.`rosterid` AS `rosterid`,
        `ktdash`.`Operative`.`opname` AS `optype`,
        count(0) AS `opcount`,
        min(`ktdash`.`RosterOperative`.`seq`) AS `firstseq`
      FROM
        (
          `ktdash`.`RosterOperative`
          JOIN `ktdash`.`Operative` ON(
            (
              (
                `ktdash`.`Operative`.`factionid` = `ktdash`.`RosterOperative`.`factionid`
              )
              AND (
                `ktdash`.`Operative`.`killteamid` = `ktdash`.`RosterOperative`.`killteamid`
              )
              AND (
                `ktdash`.`Operative`.`fireteamid` = `ktdash`.`RosterOperative`.`fireteamid`
              )
              AND (
                `ktdash`.`Operative`.`opid` = `ktdash`.`RosterOperative`.`opid`
              )
            )
          )
        )
      GROUP BY
        `ktdash`.`RosterOperative`.`userid`,
        `ktdash`.`RosterOperative`.`rosterid`,
        `ktdash`.`Operative`.`opname`
    ) `RO` ON(
      (
        (`RO`.`userid` = `R`.`userid`)
        AND (`R`.`rosterid` = `RO`.`rosterid`)
      )
    )
  )
GROUP BY
  `R`.`userid`,
  `U`.`username`,
  `R`.`rosterid`,
  `R`.`seq`,
  `R`.`rostername`,
  `R`.`factionid`,
  `R`.`killteamid`,
  `R`.`hascustomportrait`,
  `R`.`TP`,
  `R`.`CP`,
  `R`.`VP`,
  `R`.`RP`,
  `R`.`ployids`,
  `R`.`tacopids`,
  `R`.`spotlight`,
  `F`.`factionname`,
  `K`.`killteamname`,
  `K`.`description`