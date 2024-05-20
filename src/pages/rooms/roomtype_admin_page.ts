import { Page } from "../page.js";
import { Extras } from "./resources/extras.js";
import { RoomImage } from "./resources/image.js";
import { login } from "./resources/login.js";

export class RoomtypeAdminPage extends Page {
    token: string = "";
    images: RoomImage[] = [];
    extrasPopup?: Extras;
    modify: boolean = false;

    constructor() {
        super('/src/pages/rooms/roomtype_admin.html');

        login().then((result) => {
            this.token = result;
            this.extrasPopup = new Extras(this);
        });
    }
}
