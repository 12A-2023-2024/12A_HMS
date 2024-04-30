import { Page } from "../page.js";
import { Extras } from "./resources/extras";
import { RoomImage } from "./resources/image.js";
import { login } from "./resources/login.js";

export class RoomtypeAdminPage extends Page {
    token: string = "";
    images: RoomImage[] = [];
    extrasPopup?: Extras;

    constructor() {
        super('/src/pages/rooms/roomtype_admin.html');

        login().then((result) => {
            this.token = result;
            this.extrasPopup = new Extras(this);
        });
    }
}
