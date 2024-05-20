import { Page } from "../page.js";
import { Extras } from "./resources/extras.js";
import { RoomImage } from "./resources/image.js";
import { login } from "./resources/login.js";
import { Roomtype } from "./resources/roomtype.js";
import { RoomTypeEditPage } from "./roomtype_edit_window.js";

export class RoomtypeAdminPage extends Page {
    token: string = "";
    roomtypes: Roomtype[] = [];
    images: RoomImage[] = [];
    extrasPopup?: Extras;
    modify: boolean = false;

    constructor() {
        super('/src/pages/rooms/roomtype_admin.html');

        login().then((result) => {
            this.token = result;
            this.extrasPopup = new Extras(this);
            this.fillContainer();
        });
    }

    public fillContainer() {
        const container = document.querySelector(".roomtype_container");
        
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": this.token
            },
            redirect: "follow" as RequestRedirect | undefined
        };
        
        if (container) {
            container.innerHTML = "";
            fetch("https://hms.jedlik.cloud/api/rooms/types?onlyActives=true", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    this.roomtypes = result;
                })
                .then(() => {
                    this.roomtypes.forEach((roomtype) => { 
                        container.innerHTML += `
                        <div id="roomtype_${roomtype.id}">
                            <p>${roomtype.name}</p>
                            <p>${roomtype.capacity}</p>
                            <p>${roomtype.pricePerNigthPerPerson}</p>
                            <p>${roomtype.description}</p>
                            <button type="button" class="modify">✏️</button>
                            <button class="delete">🗑️</button>
                        </div>
                        `;
                    });
                    this.addEventListeners();
                });
        }
    }

    private addEventListeners() {
        Array.from(document.getElementsByClassName("modify")).forEach((button) => {
            button.addEventListener("click", () => {
                const roomTypeId = button.closest("div")?.id.split("_")[1];
                this.roomtypes.forEach((roomtype) => {
                    if (roomtype.id == roomTypeId) {
                        this.modifyRoomType(roomtype);
                    }
                });
            });
        });

        document.querySelector("#new_roomtype")?.addEventListener("click", () => {
            this.addRoomType();
        });
    }

    private modifyRoomType(roomtype: Roomtype) {
        const page = new RoomTypeEditPage(this, true);
        page.show(roomtype);
    }

    private addRoomType() {
        const page = new RoomTypeEditPage(this, false);
        page.show();
    }
}
