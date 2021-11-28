import cookie from "js-cookie"
import data from "../assets/data";
export const BASE_URL = process.env.REACT_APP_BASE_URL;;


export const logOut = () => {
    cookie.remove('auth');
    window.location.replace('/');
}

export const playerPositions = {
    GK: "Goalkeeper",
    CB: "Defender",
    SW: "Goalkeeper",
    FB: "Defender",
    WB: "Defender",
    CM: "Midfielder",
    DM: "Midfielder",
    AM: "Midfielder",
    WM: "Midfielder",
    CF: "Forward",
    SS: "Forward",
    W: "Forward",
};

const getTeamValue = () => {
    const team = data.TeamA
    return team
}

getTeamValue()