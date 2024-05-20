import { Page } from "../page.js";
import { RoomImage } from "./resources/image.js";
import { login } from "./resources/login.js";
import { Room } from "./resources/room.js";
import { Roomtype } from "./resources/roomtype.js";

export class RoomsAdminPage extends Page {
    token: string = "";
    rooms: Room[] = [];
    constructor() {
        super('/src/pages/rooms/rooms_admin.html');

        login().then((result) => {
            this.token = result;
        })
            .then(() => {
                this.fillContainer(this.token);
            });
    }


    private fillContainer(token: string) {
        const container = document.querySelector(".room_container");
        var roomTypes: Roomtype[] = [];

        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": token
            },
            redirect: "follow" as RequestRedirect | undefined
        };

        if (container) {
            fetch("https://hms.jedlik.cloud/api/rooms", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    this.rooms = result;
                    container.innerHTML = "";
                })
                .then(() => {
                    fetch("https://hms.jedlik.cloud/api/rooms/types", requestOptions)
                        .then((response) => response.json())
                        .then((result) => {
                            roomTypes = result;
                        })
                        .then(() => {
                            this.rooms.forEach((room) => {
                                var roomType: Roomtype = new Roomtype("", "", 0, 0, new Array<RoomImage>, new Array<Number>);
                                roomTypes.forEach((roomtype) => {
                                    if (roomtype.id === room.roomTypeId) {
                                        roomType = roomtype;
                                    }
                                });

                                if (roomType && roomType.name) {
                                    container.innerHTML += `
                                    <div id="room_${room.roomNumber}">
                                        <p>${room.roomNumber}</p>
                                        <p>${roomType.name}</p>
                                        <button type="button" class="modify">✏️</button>
                                        <button class="delete">🗑️</button>
                                    </div>
                                    `;
                                }
                            });
                            this.addEventListeners();
                        });
                });
        }
    }

    private addEventListeners() {
        Array.from(document.getElementsByClassName("modify")).forEach((button) => {
            button.addEventListener("click", () => {
                const roomNumber = button.closest("div")?.id.split("_")[1];
                this.rooms.forEach((room) => {
                    if (room.roomNumber === roomNumber) {
                        this.modifyRoom(room);
                    }
                });
            });
        });
    }

    private modifyRoom(room: Room) { 
        
    }
}

