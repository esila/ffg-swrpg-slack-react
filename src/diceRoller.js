import React from "react";

function DiceRoller({ rollType, diceString, diceSource, diceMessage, diceUser }){
    function handleRoll(event) {
        const API_ADDRESS = `https://3nnmgyv8f7.execute-api.us-east-1.amazonaws.com/dev/${rollType}`;
        //const API_ADDRESS = `http://127.0.0.1:5000/${rollType}`;
        event.preventDefault();
        const data = {
            roll_source: diceSource,
            roll_message: diceMessage,
            roll_string: diceString,
            roll_user: diceUser,
        };
        console.log(`Dice roller payload:\n${JSON.stringify(data)}`);
        fetch(API_ADDRESS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                res.json()
                    .then((allResp) => {
                        console.log(allResp);
                    })
            })
    }

    return (
        <>
            <button
                type="button"
                onClick={event => { handleRoll(event); }}
            >
                Roll
            </button>
        </>
    )
}

export default DiceRoller;
