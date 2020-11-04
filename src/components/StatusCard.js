import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 150,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
/*
 <p>{characterStatus.currentCharacterStatus.name}</p>
                        <p>Wounds: {characterStatus.currentCharacterStatus.wounds} | {currentCharacterSoakWounds.wounds.threshold}</p>
                        <p>Strain: {characterStatus.currentCharacterStatus.strain} | {currentCharacterSoakWounds.strain.threshol
 */
export default function StatusCard({ name, currentWounds, currentStrain, thresholdWounds, thresholdStrain }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="body2" component="p">
                    <strong>{name}</strong>
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Wounds: {currentWounds} | {thresholdWounds}
                    <br/>
                    Strain: {currentStrain} | {thresholdStrain}
                </Typography>
            </CardContent>
        </Card>
    );
}
