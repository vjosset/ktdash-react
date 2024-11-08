/* eslint-disable */
// LOL just ignore the warnings this is old code
export default function parseWeaponRules(edition, weapon, profile) {
    let weprules = profile.SR.split(",");
    weprules = weprules.map((weprule) => {
        let rule = {
            "rulename": weprule.trim(),
            "ruletext": weprule.trim()
        }
        if (rule.rulename.startsWith("*")) {
            // One-off special weapon rules (e.g. "*Detonate" or "*Custom"); skip these in the popup.
            // Their description should be in the operative's abilities.
            rule.ruletext = "(see Abilities)";
        } else {
            let rulename = weprule.trim().toUpperCase();
            switch (rulename) {
                case "BARRAGE":
                    rule.ruletext = "Cover is measured from above";
                    break;
                case "BAL":
                case "BALANCED":
                    rule.rulename = "Balanced";
                    rule.ruletext = "Can re-roll one Attack die";
                    break;
                case "BOMB SQUIG":
                    rule.ruletext = "This operative can perform a Shoot action with this weapon if it is within Engagement Range of an enemy operative. When this operative performs a Shoot action and selects this ranged weapon, make a shooting attack against each other operative within its Engagement Range - Each of them is a valid target and cannot be in Cover. After all of those shooting attacks have been made, this operative is incapacitated and do not roll for its BOOM! ability. This operative cannot make a shooting attack with this weapon by performing an Overwatch action.";
                    break;
                case "BRUTAL":
                    rule.ruletext = "Opponent can only parry with critical hits";
                    break;
                case "CEASELESS":
                    switch (edition) {
                        case 'kt21':
                            rule.ruletext = "Can re-roll any or all results of 1";
                            break;
                        case 'kt24':
                            rule.ruletext = "Can re-roll any or all results of one value (e.g. all results of 2)";
                            break;
                    }
                    break;
                case "COMBI-DWBG":
                    rule.ruletext = "Can be combined with a DeathWatch Boltgun";
                    break;
                case "COMBI-BOLTGUN":
                    rule.ruletext = "Can be combined with a Boltgun";
                    break;
                case "DAEMONIC ENERGIES":
                    rule.ruletext = "Each time this operative fights in combat, in the Roll Attack Dice step of that combat, each time you retain a critical hit, the target suffers 2 Mortal Wounds.";
                    break;
                case "DETONATE":
                    rule.ruletext = "Each time this operative makes a Shoot action using its remote mine, make a shooting attack against each operative within " + "[CIRCLE]" + " of the centre of its Mine token with that weapon. When making those shooting attacks, each operative (friendly and enemy) within " + "[CIRCLE]" + " is a valid target, but when determining if it is in Cover, treat this operative’s Mine token as the active operative. An operative cannot be a valid target if Heavy terrain is wholly intervening (must be able to draw a Cover line from the centre of the Mine token to any part of the intended target’s base without crossing Heavy terrain). Then remove this operative’s Mine token. An operative cannot make a shooting attack with this weapon by performing an Overwatch action, or if its Mine token is not in the killzone.";
                    break;
                case "EXPERT RIPOSTE":
                    rule.ruletext = "Each time this operative fights in combat using its duelling blades, in the Resolve Successful Hits step of that combat, each time you parry with a critical hit, also inflict damage equal to the weapon's Critical Damage characteristic.";
                    break;
                case "FUS":
                case "FUSILLADE":
                    rule.rulename = "Fusillade";
                    rule.ruletext = "Distribute the Attack dice between valid targets within " + "[CIRCLE]" + " of original target";
                    break;
                case "GRAV":
                case "GRAV*":
                    rule.ruletext = "Each time this operative makes a shooting attack with this weapon, if the target has an unmodified Save characteristic of 3+ or better, this weapon has the Lethal 4+ special rule for that attack.";
                    break;
                case "HVY":
                case "HEAVY":
                    rule.rulename = "Heavy";
                    switch (edition) {
                        case 'kt21':
                            rule.ruletext = "Cannot Shoot in the same activation as Move, Charge, or Fall Back";
                            break;
                        case 'kt24':rule.ruletext = "An operative cannot use this weapon in an activation in which it moved, and it cannot move in an activation in which it used this weapon.";
                            break;
                    }
                    break;
                case "HUMBLING CRUELTY":
                    rule.ruletext = "Each time a friendly operative makes a shooting attack with this weapon, in the Resolve Successful hits step of that shooting attack, if the target loses any wounds, the target is injured until the end of the Turning Point";
                    break;
                case "HOT":
                    switch (edition) {
                        case 'kt21':
                            rule.ruletext = "For each discarded Attack die result of 1 inflict 3 Mortal Wounds to the bearer";
                            break;
                        case 'kt24':
                            rule.ruletext = "After using this weapon, roll 1D6. If the result is less than the weapon's HIT stat, inflict Damage on that operative equal to the result multiplied by 2. If it is used multiple times in one action (e.g. Blast), roll only 1D6.";
                            break;
                    }
                    break;
                case "IND":
                case "INDIRECT":
                    rule.rulename = "Indirect";
                    rule.ruletext = "Ignores cover when selecting valid targets. Must still be Visible and not Obscured.";
                    break;
                case "LASH WHIP":
                    rule.rulename = "Lash Whip";
                    rule.ruletext = "While an enemy operative is within Engagement Range of friendly operatives equipped with this weapon, subtract 1 from that enemy operative's Attacks characteristics.";
                    break;
                case "NO COVER":
                    rule.ruletext = "Target can't retain autosuccess for cover, must roll all Defence dice";
                    break;
                case "NOOBS":
                case "NOOBSCURE":
                    rule.rulename = "No Obscure";
                    rule.ruletext = "Enemy operatives cannot be Obscured.";
                    break;
                case "PARRY HOOK":
                    rule.ruletext = "Each time a friendly operative fights in combat with this weapon, in the Resolve Successful Hits step of that combat, each time you parry with a normal hit, you can select one of your opponent''s critical hits to be discarded instead.";
                    break;
                case "PUN":
                case "PUNISHING":
                    rule.ruletext = "If you retain any critical successes, you can retain one of your fails as a normal success instead of discarding it.";
                    break;
                case "RELENTLESS":
                    rule.ruletext = "Can re-roll any or all Attack dice";
                    break;
                case "REND":
                case "RENDING":
                    rule.rulename = "Rending";
                    rule.ruletext = "If you retain any critical hits, retain 1 normal hit as a critical hit instead.";
                    break;
                case "SAT":
                case "SATURATE":
                    rule.rulename = "Saturate";
                    rule.ruletext = "The defender cannot retain Cover saves."
                    break;
                case "SEEK":
                    rule.rulename = "Seek";
                    rule.ruletext = "When selecting a valid target, operatives cannot use terrain for cover."
                    break;
                case "SEEKLT":
                case "SEEKLIGHT":
                case "SEEK LIGHT":
                    rule.rulename = "Seek Light";
                    rule.ruletext = "When selecting a valid target, operatives cannot use light terrain for cover. While this can allow such operatives to be targeted (assuming they are Visible), it does not remove their Cover save (if any)."
                    break;
                case "SEV":
                case "SEVERE":
                    rule.rulename = "Severe";
                    rule.ruletext = "If you do not retain any critical successes, you can change one of your normal successes to a critical success. Any rules that take effect as a result of retaining a critical success (e.g. Devastating, Piercing Crits, etc.) still do."
                    break;
                case "SHOCK":
                    rule.rulename = "Shock";
                    rule.ruletext = "The first time you strike with a critical success in each sequence, also discard one of your opponent's unresolved normal successes (or a critical success if there are none)."
                    break;
                case "SIL":
                case "SILENT":
                    rule.rulename = "Silent";
                    rule.ruletext = "Can Shoot this weapon while on a Conceal order";
                    break;
                case "SIPHON LIFE FORCE":
                    rule.ruletext = "Each time a friendly operative makes a shooting attack with this weapon, in the Resolve Successful Hits step of that shooting attack, if you resolve two or more attack dice, you can select one friendly LEGIONARY operative within " + "[PENT]" + " of the target to regain 1D3 lost wounds.";
                    break;
                case "SMART TARGETING":
                    rule.ruletext = "Each time this operative makes a shooting attack with this weapon, you can use this special rule. If you do so, for that shooting attack:<br/><li>Enemy operatives with an Engage order that are not within Engagement Range of friendly operatives are valid targets and cannot be in Cover.</li><li>In the Roll Attack Dice step of that shooting attack, attack dice results of 6 are successful normal hits. All other attack dice results are failed hits.</li>";
                    break;
                case "STORM SHIELD":
                    rule.ruletext = "If this operative is equipped with a storm shield:<ul><li>It has a 4+ Invulnerable Save</li><li>Each time it fights in combat, in the Resolve Successful Hits step of that combat, each time it parries, two of your opponent's successful hits are discarded (instead of one).</li></ul>";
                    break;
                case "STUN":
                    switch (edition) {
                        case 'kt21':
                            rule.ruletext = "Shooting: If you retain any critical hits, subtract 1 from APL of target<br/>Fighting: First critical strike discard 1 normal hit of the target, Second critical strike subtract 1 from APL of target";
                            break;
                        case 'kt24':
                            rule.ruletext = "If you retain any critical hits, subtract 1 from APL of target until the end of its next activation";
                            break;
                    }
                    break;
                case "UNLOAD SLUGS":
                    rule.ruletext = "Each time this operative makes a shooting attack with this weapon, in the Roll Attack Dice step of that shooting attack, if the target is within " + "[PENT]" + " of it, you can re-roll any or all of your attack dice.";
                    break;
                case "UNWIELDY":
                    rule.ruletext = "Shooting costs +1 AP, no Overwatch";
                    break;
                case "VICIOUS BLOWS":
                    rule.ruletext = "Each time this operative fights in combat:<ul><li>If this operative is the Attacker, this weapon gains the Ceaseless special rule for that combat</li><li>If this operative performed a Charge action during this activation, this weapon gains the Relentless special rule for that combat</li></ul>";
                    break;
            }

            // Other cases
            // KT2024
            if (rulename.startsWith("ACC")) {
                let num = rulename.replace("ACC", "");
                rule.rulename = "Accurate " + num;
                rule.ruletext = "You can retain up to " + num + " Attack Dice as normal successes without rolling them.";
            } else if (rulename.startsWith("HVY") && rulename.length > 3) {
                let sp = rulename.replace("HVY", "");
                rule.rulename = "Heavy " + sp;
                rule.ruletext = "An operative cannot use this weapon in an activation in which it moved, and it cannot move in an activation in which it used this weapon. This rule has no effect on preventing the Guard action.";
                if (sp != "") {
                    sp = sp.replace("(REPONLY)", "Reposition");
                    sp = sp.replace("(DASHONLY)", "Dash");
                    rule.ruletext += "<br/>Only the " + sp + " action is allowed."
                }
            } else if (rulename.startsWith("PRCCRIT")) {
                let num = rulename.replace("PRCCRIT", "");
                rule.rulename = "Piercing Crits " + num;
                rule.ruletext = "If you retain any critical successes, the defender collects " + num + " less Defence dice.";
            } else if (rulename.startsWith("PRC")) {
                let num = rulename.replace("PRC", "");
                rule.rulename = "Piercing " + num;
                rule.ruletext = "The defender collects " + num + " less Defence dice.";
            } else if (rulename.indexOf("DEV") > -1) {
                let rng = rulename.split("D")[0];
                let dam = rulename.split("V")[1];
                rule.rulename = rng + "Devastating " + dam;
                if (rng != "") {
                    rule.ruletext = "Each retained critical success immediately inflicts " + dam + " damage on the operative this weapon is being used against and each other operative Visible To and within " + rng + " of it. Note that success isn't discarded after doing so - it can still be resolved later in the sequence.";
                } else {
                    rule.ruletext = "Each retained critical success immediately inflicts " + dam + " damage on the operative this weapon is being used against.";
                }
            } else if (rulename.startsWith("LIM")) {
                let num = rulename.replace("LIMITED", "").replace("LIM", "");
                if (num == "") {
                    num = 1;
                }
                rule.rulename = "Limited " + num;
                rule.ruletext = "After an operative uses this weapon " + num + " times, they no longer have it. If it is used multiple times in one action (e.g. Blast) treat this as one use.";
            }
            // KT2021
            if (rulename.startsWith("AP")) {
                let num = rulename.replace("AP", "");
                rule.ruletext = "Remove " + num + " Defence dice from target before roll. Multiple APs do not stack.";
            } else if (rulename.startsWith("BLAST")) {
                let range = rulename.replace("BLAST", "").toLowerCase();
                rule.ruletext = "Each time this weapon is fired, after making the attack against the target, make a shooting attack against each other operative Visible To and within " + range + " of the original target. Each of them is a valid target and cannot be in Cover.";
                if (edition != 'kt24') {
                    rule.ruletext += "<br/>An operative cannot make a shooting attack with this weapon by performing an Overwatch action.";
                }
            } else if (rulename.startsWith("INFERNO")) {
                let num = rulename.replace("INFERNO", "");
                rule.ruletext = "Each time a friendly operative fights in combat or makes a shooting attack with this weapon, in the Roll Attack Dice step of that combat or shooting attack, if you retain any critical hits, the target gains " + num + " Inferno tokens. At the end of each Turning Point, roll one D6 for each Inferno token an enemy operative has: on a 4+, that enemy operative suffers 1 mortal wound. After rolling, remove all Inferno tokens that operative has.";
            } else if (rulename.startsWith("LETHAL") && rulename.endsWith("(CQ)")) {
                let num = rulename.replace("LETHAL", "");
                rule.ruletext = "Close Quarters: Inflict critical hits on 5+ instead of 6+";
            } else if (rulename.startsWith("LETHAL")) {
                let num = rulename.replace("LETHAL", "");
                rule.ruletext = "Inflict critical hits on " + num + " instead of 6+";
            } else if (rulename.startsWith("MW")) {
                let num = rulename.replace("MW", "");
                rule.ruletext = "For each critical hit retained, inflict " + num + " Mortal Wounds to target";
            } else if (rulename.startsWith("P") && rulename.length == 2) {
                let num = rulename.replace("P", "");
                rule.ruletext = "Weapon gains AP" + num + " rule if you retain a critical hit";
            } else if (rulename.startsWith("REAP")) {
                let num = rulename.replace("REAP", "");
                rule.ruletext = "For each successful critical strike, inflict MW" + num + " on each other enemy within " + "[TRI]" + " of the operative using this weapon or the original target.";
            } else if (rulename.startsWith("RNG")) {
                let range = rulename.replace("RNG", "");
                rule.rulename = rule.rulename.replace("Rng", "Range");
                rule.ruletext = "Range limit of the weapon";
            } else if (rulename.startsWith("SPLASH")) {
                let num = rulename.replace("SPLASH", "");
                rule.ruletext = "For each critical hit, inflict MW" + num + " to the target and any other operative within " + "[CIRCLE]" + " of the target";
            } else if (rulename.startsWith("TOR")) {
                let range = rulename.replace("TORRENT", "");
                range = rulename.replace("TOR", "").toLowerCase();
                rule.rulename = "Torrent " + range;
                switch (edition) {
                    case 'kt21':
                        rule.ruletext = "Each time a friendly operative performs a Shoot action or Overwatch action and selects this weapon, after making the shooting attack against the target, it can make a shooting attack with this weapon against each other valid target within " + range + " of the original target and each other.";
                        break;
                    case 'kt24':
                        rule.ruletext = "Each time a friendly operative performs a Shoot action or Overwatch action and selects this weapon, after making the shooting attack against the target, it can make a shooting attack with this weapon against each other valid target within " + range + " of the original target.";
                        break;
                }
            }
        }
        return rule;
    })
    return weprules;
}
