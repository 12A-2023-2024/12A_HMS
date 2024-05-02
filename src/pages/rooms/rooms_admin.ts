import { Page } from "../page.js";
import { login } from "./resources/login";
import { RoomtypeSelector } from "./resources/roomtypeSelector.js";


export class RoomsAdminPage extends Page {
    token: string = "";
    roomTypeSelector?: RoomtypeSelector;

    constructor() {
        super('/src/pages/rooms/rooms_admin.html');

        login().then((result) => {
            this.token = result;
            this.roomTypeSelector = new RoomtypeSelector(this);
        });
    }
}

