import React, {useContext, useState} from 'react';
import './Sidebar.css';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { UserContext} from "../App";
import SidebarOption from './SidebarOption';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AppsIcon from '@material-ui/icons/Apps';
import BuildIcon from '@material-ui/icons/Build'
import {Menu, MenuItem} from '@material-ui/core';
import CharacterSheetModal from './CharacterSheetModal';
import SkillsModal from './SkillsModal';
import CombatModal from './CombatModal';
import VehiclesModal from './VehiclesModal';
import DiceModal from "../diceModal";
import CustomizedSnackbars from './CustomizedSnackBar';

function Sidebar({ activeIndex, setActiveIndex, userCharacterSheets, fetchUserCharacterSheets }) {
    const user = useContext(UserContext);
    const currentCS = userCharacterSheets && userCharacterSheets[activeIndex];
    const characterName = userCharacterSheets && userCharacterSheets[activeIndex] && userCharacterSheets[activeIndex].character.name;

    // Dice Modal Init
    const initDicePool = {
        ability: 0,
        proficiency: 0,
        boost: 0,
        difficulty: 0,
        challenge: 0,
        setback: 0,
        force: 0
    };
    const initDiceCheck = {
        dicePool: initDicePool,
        roll_message: {},
        roll_source: "",
        roll_user: "",
        roll_type: ""
    };

    // Dice Modal State
    const [diceModalOpen, setDiceModalOpen] = useState(false);
    const [diceModalContainerClose, setDiceModalContainerClose] = useState(() => {});
    const [diceCheck, setDiceCheck] = useState(initDiceCheck);

    const handleClickDiceModalOpen = (selectedDiceCheck) => {
        const dicePool = {...diceCheck.dicePool, ...selectedDiceCheck.dicePool};
        const {roll_source, roll_user, roll_message, roll_type} = selectedDiceCheck;
        setDiceCheck({ dicePool, roll_source, roll_user, roll_message, roll_type });
        setDiceModalOpen(true);
    };

    const handleDiceModalClose = (container = false) => {
        setDiceCheck(initDiceCheck);
        setDiceModalOpen(false);
        container && diceModalContainerClose();
    };

    // User Menu (edit character sheet)
    const [anchorUserMenuEl, setanchorUserMenuEl] = useState(null);
    const handleUserMenuClick = (event) => { setanchorUserMenuEl(event.currentTarget); };
    const handleUserMenuClose = () => { setanchorUserMenuEl(null); };

    // Character Sheet Modal State
    const [csOpen, setCSOpen] = useState(false);
    const handleOpenCSModal = () => { setCSOpen(true) };
    const handleCloseCSModal = () => { setCSOpen(false) };

    // Save Snackbar State
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleOpenSnackbar= () => { setSnackbarOpen(true) };
    const handleCloseSnackbar= (event, reason) => {
        if (reason === 'clickaway') { return; }
        setSnackbarOpen(false);
    };

    // Skills Modal State
    const [skillsOpen, setSkillsOpen] = useState(false);
    const handleOpenSkillsModal = () => {
        setSkillsOpen(true);
        setDiceModalContainerClose(() => handleCloseSkillsModal);
    };
    const handleCloseSkillsModal = () => { setSkillsOpen(false) };

    // Combat Modal State
    const [combatOpen, setCombatOpen] = useState(false);
    const handleOpenCombatModal = () => {
        setCombatOpen(true);
        setDiceModalContainerClose(() => handleCloseCombatModal);
    };
    const handleCloseCombatModal = () => { setCombatOpen(false) };

    // Vehicles Modal State
    const [vehiclesOpen, setVehiclesOpen] = useState(false);
    const handleOpenVehiclesModal = () => {
        setVehiclesOpen(true);
        setDiceModalContainerClose(() => handleCloseVehiclesModal);
    };
    const handleCloseVehiclesModal = () => { setVehiclesOpen(false) };

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <div className="sidebar_info" onClick={handleUserMenuClick} style={{cursor: "pointer"}}>
                    <h2>The Armorer</h2>
                    <h3>
                        <FiberManualRecordIcon/>
                        {characterName || "NEW CHARACTER"} | {user && user.replace(/["]+/g, '')}
                    </h3>
                </div>
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorUserMenuEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                open={Boolean(anchorUserMenuEl)}
                onClose={handleUserMenuClose}
                PaperProps={{
                    style: {
                        width: '40ch'
                    },
                }}
            >
                <MenuItem onClick={() => {
                    handleOpenCSModal();
                    handleUserMenuClose();
                }}
                >
                    Modify Character Sheet
                </MenuItem>
                {userCharacterSheets.map((sheet, sheet_idx) => {
                    return (
                        <MenuItem onClick={() => {
                            setActiveIndex(sheet_idx);
                            handleUserMenuClose();
                        }}>{sheet.character.name}</MenuItem>
                    );
                })}
                <MenuItem onClick={handleUserMenuClose}></MenuItem>
                <MenuItem onClick={handleUserMenuClose}></MenuItem>
                <MenuItem onClick={handleUserMenuClose}></MenuItem>
                <AmplifySignOut/>
            </Menu>
            <CharacterSheetModal
                open={csOpen}
                handleClose={handleCloseCSModal}
                currentCS={currentCS}
                fetchUserCharacterSheets={fetchUserCharacterSheets}
                handleOpenSnackBar={handleOpenSnackbar}
            />
            {currentCS &&
            <>
                <SkillsModal
                    open={skillsOpen}
                    handleClose={handleCloseSkillsModal}
                    currentCS={currentCS}
                    handleClickDiceModalOpen={handleClickDiceModalOpen}
                />
                < CombatModal
                    open={combatOpen}
                    handleClose={handleCloseCombatModal}
                    currentCS={currentCS}
                    handleClickDiceModalOpen={handleClickDiceModalOpen}
                />
                <VehiclesModal
                    open={vehiclesOpen}
                    handleClose={handleCloseVehiclesModal}
                    currentCS={currentCS}
                    handleClickDiceModalOpen={handleClickDiceModalOpen}
                />
                <DiceModal
                    open={diceModalOpen}
                    diceCheck={diceCheck}
                    setDiceCheck={setDiceCheck}
                    handleClose={handleDiceModalClose}
                />
                <CustomizedSnackbars
                    open={snackbarOpen}
                    handleClose={handleCloseSnackbar}
                />
                <SidebarOption Icon={BuildIcon} title="Skills" handleOpen={handleOpenSkillsModal}/>
                <hr/>
                <SidebarOption Icon={AppsIcon} title="Combat" handleOpen={handleOpenCombatModal}/>
                <hr/>
                <SidebarOption Icon={AppsIcon} title="Vehicles" handleOpen={handleOpenVehiclesModal}/>
                <hr/>
            </>
            }
        </div>
    )
}

export default Sidebar;
