function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rollDice(diceMap) {
    const resultObj = {
        success: {num: 0, symbol: "S.png"},
        failure: {num: 0, symbol: "F.png"},
        advantage: {num: 0, symbol: "A.png"},
        threat: {num: 0, symbol: "T.png"},
        triumph: {num: 0, symbol: "Triumph.png"},
        despair: {num: 0, symbol: "Despair.png"},
        light: {num: 0, symbol: "L.png"},
        dark: {num: 0, symbol: "D.png"},
    }
    const dieFaces = {
        "ability": {
            1: [["blank"], "abilityBlank.png"],
            2: [["success"], "abilityS.png"],
            3: [["success"], "abilityS.png"],
            4: [["advantage"], "abilityA.png"],
            5: [["advantage"], "abilityA.png"],
            6: [["success", "advantage"], "abilitySA.png"],
            7: [["advantage", "advantage"], "abilityAA.png"],
            8: [["success", "success"], "abilitySS.png"],
        },
        "boost": {
            1: [["blank"], "boostBlank.png"],
            2: [["blank"], "boostBlank.png"],
            3: [["success"], "boostS.png"],
            4: [["advantage"], "boostA.png"],
            5: [["advantage", "advantage"], "boostAA.png"],
            6: [["success", "advantage"], "boostSA.png"],
        },
        "challenge": {
            1: [["blank"], "ChallengeBlank.png"],
            2: [["despair", "failure"], "ChallengeDespair.png"],
            3: [["failure"], "ChallengeF.png"],
            4: [["failure"], "ChallengeF.png"],
            5: [["threat"], "ChallengeT.png"],
            6: [["threat"], "ChallengeT.png"],
            7: [["failure", "failure"], "ChallengeFF.png"],
            8: [["failure", "failure"], "ChallengeFF.png"],
            9: [["threat", "threat"], "ChallengeTT.png"],
            10: [["threat", "threat"], "ChallengeTT.png"],
            11: [["failure", "threat"], "ChallengeFT.png"],
            12: [["failure", "threat"], "ChallengeFT.png"],
        },
        "difficulty": {
            1: [["blank"], "DifficultyBlank.png"],
            2: [["failure"], "DifficultyF.png"],
            3: [["threat"], "DifficultyT.png"],
            4: [["threat"], "DifficultyT.png"],
            5: [["threat"], "DifficultyT.png"],
            6: [["failure", "failure"], "DifficultyFF.png"],
            7: [["failure", "threat"], "DifficultyFT.png"],
            8: [["threat", "threat"], "DifficultyTT.png"],
        },
        "force": {
            1: [["light"], "ForceL.png"],
            2: [["light"], "ForceL.png"],
            3: [["light", "light"], "ForceLL.png"],
            4: [["light", "light"], "ForceLL.png"],
            5: [["light", "light"], "ForceLL.png"],
            6: [["dark"], "ForceD.png"],
            7: [["dark"], "ForceD.png"],
            8: [["dark"], "ForceD.png"],
            9: [["dark"], "ForceD.png"],
            10: [["dark"], "ForceD.png"],
            11: [["dark"], "ForceD.png"],
            12: [["dark", "dark"], "ForceDD.png"],
        },
        "proficiency": {
            1: [["blank"], "ProficiencyBlank.png"],
            2: [["triumph", "success"], "ProficiencyTriumph.png"],
            3: [["success"], "ProficiencyS.png"],
            4: [["success"], "ProficiencyS.png"],
            5: [["advantage"], "ProficiencyA.png"],
            6: [["success", "advantage"], "ProficiencySA.png"],
            7: [["success", "advantage"], "ProficiencySA.png"],
            8: [["success", "advantage"], "ProficiencySA.png"],
            9: [["success", "success"], "ProficiencySS.png"],
            10: [["success", "success"], "ProficiencySS.png"],
            11: [["advantage", "advantage"], "ProficiencyAA.png"],
            12: [["advantage", "advantage"], "ProficiencyAA.png"],
        },
        "setback": {
            1: [["blank"], "SetBackBlank.png"],
            2: [["blank"], "SetBackBlank.png"],
            3: [["failure"], "SetBackF.png"],
            4: [["failure"], "SetBackF.png"],
            5: [["threat"], "SetBackT.png"],
            6: [["threat"], "SetBackT.png"],
        },
    }

    let rollDieFaces = [];
    Object.keys(diceMap).forEach((key) => {
        if (diceMap[key]) {
            const numDie = diceMap[key];
            const randomRange = Object.keys(dieFaces[key]).length;
            [...Array(numDie).keys()].forEach((i) => {
                const dieResultNum = getRandomInt(1, randomRange);
                const [dieResultList, dieResultFace] = dieFaces[key][dieResultNum];
                rollDieFaces.push(dieResultFace);

                // Add up success, advantage, failure, threat, etc.
                dieResultList.forEach((result) => {
                    if (Object.keys(resultObj).includes(result)) {
                        resultObj[result].num += 1
                    }
                })

                const calculate_net = (ying, yang) => {
                    const net = resultObj[ying].num - resultObj[yang].num;
                    if (net >= 0) {
                        resultObj[ying].num = net;
                        resultObj[yang].num = 0;
                    } else {
                        resultObj[ying].num = 0;
                        resultObj[yang].num = Math.abs(net);
                    }
                }

                calculate_net("success", "failure");
                calculate_net("advantage", "threat");
            })
        }
    })
    // Roll die faces, net result string and symbols
    const netResultKeys = Object.keys(resultObj).filter((key) => resultObj[key].num);
    const resultString = netResultKeys.map((result) => `${resultObj[result].num} ${result}`).join(", ");

    let resultSymbols = [];
    netResultKeys.forEach((key) => {
        [...Array(resultObj[key].num).keys()].forEach((i) => {
            resultSymbols.push(resultObj[key].symbol);
        })
    })

    return [rollDieFaces, resultString, resultSymbols];
}

