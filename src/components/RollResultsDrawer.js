import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Chat from './Chat';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer({ open, handleOpen, handleClose }) {
    const classes = useStyles();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        open ? handleClose() : handleOpen();
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Chat handleOpen={handleOpen} handleClose={handleClose}/>
        </div>
    );

    return (
        <div>
            <Drawer
                className={classes.drawer}
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
                variant="persistent"
            >
                {list("right")}
            </Drawer>
        </div>
    );
}
