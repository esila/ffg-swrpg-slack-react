import React, {useContext, useState} from 'react';
import './Sidebar.css';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { UserContext} from "../App";
import SidebarOption from './SidebarOption';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import AppsIcon from '@material-ui/icons/Apps';
import BuildIcon from '@material-ui/icons/Build'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CharacterSheetModal from './CharacterSheetModal';

function Sidebar({ activeIndex, setActiveIndex, userCharacterSheets }) {
    const user = useContext(UserContext);
    const currentCS = userCharacterSheets && userCharacterSheets[activeIndex];
    const characterName = userCharacterSheets && userCharacterSheets[activeIndex] && userCharacterSheets[activeIndex].character.name;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Character Sheet Modal State
    const [csOpen, setCSOpen] = useState(false);
    const handleOpenCSModal = () => { setCSOpen(true) };
    const handleCloseCSModal = () => { setCSOpen(false) };

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <div className="sidebar_info" onClick={handleClick}>
                    <h2>The Armorer</h2>
                    <h3>
                        <FiberManualRecordIcon/>
                        {characterName} | {user && user.replace(/["]+/g, '')}
                    </h3>
                </div>
                <CreateIcon/>
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '40ch'
                    },
                }}
            >
                <MenuItem onClick={() => {
                    handleOpenCSModal();
                    handleClose();
                }}
                >Character Sheet
                </MenuItem>
                <MenuItem onClick={handleClose}>Switch Character</MenuItem>
            </Menu>
            <CharacterSheetModal
                open={csOpen}
                handleClose={handleCloseCSModal}
                currentCS={currentCS}
            />
            <SidebarOption Icon={BuildIcon} title="Skills" pathname="/skills" />
            <hr/>
            <SidebarOption Icon={AppsIcon} title="Weapons" pathname="/weapons"/>
            <hr/>
            <SidebarOption Icon={AppsIcon} title="Talents & Special Abilities" pathname="/talents"/>
            <hr/>
            <SidebarOption Icon={AppsIcon} title="Visuals" pathname="/visuals"/>
            <hr/>
            <AmplifySignOut/>
        </div>
    )
}

export default Sidebar;
