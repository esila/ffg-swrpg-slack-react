import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    root: {
        minWidth: 240,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Message({ message, user }) {
    const classes = useStyles();
    const { roll_source, roll_message, rollDieFaces, resultString, resultSymbols } = JSON.parse(message);
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="body2" component="p">
                    <strong>{user}</strong>
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {roll_source}
                </Typography>
                {roll_message && Object.keys(roll_message).map((key, key_idx) => {
                    return (
                        <>
                            <strong>{key}: </strong>{roll_message[key]}
                            <br/>
                        </>
                    )
                })}
                <br/>
                <Typography variant="body2" component="p">
                    Dice roll:
                </Typography>
                {rollDieFaces.map((face, face_idx) => {
                    return (
                        <img
                            key={face_idx}
                            src={`https://starwars-armorer-images.s3.amazonaws.com/${face}`}
                            style={{height: "30px"}}
                        />
                    )
                })}
                <br/>
                <br/>
                <Typography variant="body2" component="p">
                    Net result:
                </Typography>
                {resultSymbols.map((symbol, symbol_idx) => {
                    return (
                        <img
                            key={symbol_idx}
                            src={`https://starwars-armorer-images.s3.amazonaws.com/${symbol}`}
                            style={{height: "30px"}}
                        />
                    )
                })}
                <Typography variant="body2" component="p">
                    (<strong>{resultString}</strong>)
                </Typography>
            </CardContent>
        </Card>
    );
}
