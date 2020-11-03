import React, {useState} from 'react'
import {
    Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, DialogActions, Grid, Divider
} from "@material-ui/core";
import { API } from 'aws-amplify';
import {createMessage as createMessageMutation} from "./graphql/mutations";
import {rollDice} from "./components/DiceAPI";
import './sheet-style.css';

function DiceModal({open, diceCheck, setDiceCheck, handleClose}) {

    const [positiveUpgrade, setPositiveUpgrade] = useState(0);
    const [negativeUpgrade, setNegativeUpgrade] = useState(0);
    const diceTypes = ["Ability", "Proficiency", "Boost", "Difficulty", "Challenge", "Setback", "Force"];
    const positiveDice = diceTypes.slice(0,3);
    const negativeDice = diceTypes.slice(3,6);
    const { dicePool, roll_type, roll_source, roll_user, roll_message } = diceCheck;

    async function createMessage(data) {
        const {message, user, type, timestamp} = data;
        if (!message || !user || !type) return;
        await API.graphql({ query: createMessageMutation, variables: { input: { data } } });
    }

    const handleRoll = (event) => {
        //const API_ADDRESS = `https://3nnmgyv8f7.execute-api.us-east-1.amazonaws.com/dev/${roll_type}`;
        //const API_ADDRESS = `http://127.0.0.1:5000/${rollType}`;
        event.preventDefault();
        const roll_string = diceTypes.map((type) => {
            const key = type.toLowerCase();
            const prefix = key[0];
            return dicePool[key] && `${dicePool[key]}${prefix}`;
        }).filter(n => n).join(' ');
        const data = { roll_source, roll_message, roll_string, roll_user };
        // TODO - calculate result from roll_string
        const [rollDieFaces, resultString, resultSymbols] = rollDice(dicePool);
        console.log(rollDieFaces, resultString, resultSymbols);
        // Take result and shape into proper message to store
        // Take result message and parse to JSON and populate on front end
        console.log(`Dice roller payload:\n${JSON.stringify(data)}`);

        /*
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
            });
         */
        setPositiveUpgrade(0);
        setNegativeUpgrade(0);
        handleClose(true);
    };

    const toggleDicePool = (e) => {
        e.preventDefault();
        const {target: {name, value}} = e;
        let { ability, proficiency, difficulty, challenge } = diceCheck.dicePool;
        if (name === "positiveUpgrade") {
            // Upgrade any ability die to proficiency
            if (value > positiveUpgrade && ability) {
                ability--;
                proficiency++;
            }
            // Add ability die if there are no more ability available to upgrade
            else if (value > positiveUpgrade && !ability) {
                ability++;
            }
            // Downgrade any proficiency die to ability
            else if (value < positiveUpgrade && proficiency) {
                proficiency--;
                ability++;
            }
            setPositiveUpgrade(value);
            setDiceCheck(prev => ({
                ...prev,
                dicePool: {
                    ...prev.dicePool,
                    ability: ability,
                    proficiency: proficiency,
                }
            }));
            return;
        }
        if (name === "negativeUpgrade") {
            // Upgrade any difficulty die to challenge
            if (value > negativeUpgrade && difficulty) {
                difficulty--;
                challenge++;
            }
            // Add difficulty die if there are no more difficulty available to upgrade
            else if (value > negativeUpgrade && !difficulty) {
                difficulty++;
            }
            // Downgrade any challenge die to difficulty
            else if (value < negativeUpgrade && challenge) {
                challenge--;
                difficulty++;
            }
            setNegativeUpgrade(value);
            setDiceCheck(prev => ({
                ...prev,
                dicePool: {
                    ...prev.dicePool,
                    difficulty: difficulty,
                    challenge: challenge,
                }
            }));
            return;
        }
        setDiceCheck(prev => ({
            ...prev,
            dicePool: {
                ...prev.dicePool,
                [name]: Number.parseInt(value)
            }
        }));
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Dice Check - {roll_source}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Modify your dice pool here. You can either directly modify specific dice numbers or
                        choose to upgrade and downgrade the current dicepool.
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs style={{textAlign: "center"}}>
                            {positiveDice.map((type, type_idx) => {
                                return (
                                    <React.Fragment key={type_idx}>
                                        <TextField
                                            key={type_idx}
                                            margin="dense"
                                            label={type}
                                            name={type.toLowerCase()}
                                            type="number"
                                            variant="outlined"
                                            value={dicePool[type.toLowerCase()]}
                                            onChange={(e) => toggleDicePool(e)}
                                        />
                                        <br/>
                                    </React.Fragment>
                                )
                            })}
                            <TextField
                                margin="dense"
                                label="Upgrade/Downgrade"
                                name="positiveUpgrade"
                                type="number"
                                variant="filled"
                                value={positiveUpgrade}
                                onChange={(e) => toggleDicePool(e)}
                            />
                        </Grid>
                        <Grid item xs style={{textAlign: "center"}}>
                            <TextField
                                margin="dense"
                                label="Force"
                                name="force"
                                type="number"
                                variant="outlined"
                                value={dicePool.force}
                                onChange={(e) => toggleDicePool(e)}
                            />
                        </Grid>
                        <Grid item xs style={{textAlign: "center"}}>
                            {negativeDice.map((type, type_idx) => {
                                return (
                                    <React.Fragment key={type_idx}>
                                        <TextField
                                            key={type_idx}
                                            margin="dense"
                                            label={type}
                                            name={type.toLowerCase()}
                                            type="number"
                                            variant="outlined"
                                            value={dicePool[type.toLowerCase()]}
                                            onChange={(e) => toggleDicePool(e)}
                                        />
                                        <br/>
                                    </React.Fragment>
                                )
                            })}
                            <TextField
                                margin="dense"
                                label="Upgrade/Downgrade"
                                name="negativeUpgrade"
                                type="number"
                                variant="filled"
                                value={negativeUpgrade}
                                onChange={(e) => toggleDicePool(e)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="button"
                        onClick={() => {
                            setPositiveUpgrade(0);
                            setNegativeUpgrade(0);
                            handleClose();
                        }}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button type="button" onClick={(e) => handleRoll(e)} color="primary">
                        Roll
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DiceModal
