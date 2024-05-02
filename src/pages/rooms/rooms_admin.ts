import { Page } from "../page.js";
import { login } from "./resources/login";
import { RoomtypePopup } from "./resources/roomtypePopup";


export class RoomsAdminPage extends Page {
    token: string = "";
    roomTypePopup?: RoomtypePopup;

    constructor() {
        super('/src/pages/rooms/rooms_admin.html');

        login().then((result) => {
            this.token = result;
            this.roomTypePopup = new RoomtypePopup(this);
        });
    }
}

