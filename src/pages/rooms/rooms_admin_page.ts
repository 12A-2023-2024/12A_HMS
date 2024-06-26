import { Page } from "../page.js";
import { RoomImage } from "./resources/image.js";
import { login } from "./resources/login.js";
import { Room } from "./resources/room.js";
import { Roomtype } from "./resources/roomtype.js";
import { RoomsEditPage } from "./room_edit_window.js";

export class RoomsAdminPage extends Page {
    token: string = "";
    rooms: Room[] = [];
    roomTypes: Roomtype[] = [];

    constructor() {
        super('/src/pages/rooms/rooms_admin.html');

        login().then((result) => {
            this.token = result;
        })
            .then(() => {
                this.fillContainer();
            });
    }

    public fillContainer() {
        const container = document.querySelector(".room_container");
        if (container) {
            container.innerHTML = "";
        }

        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": this.token
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
                            this.roomTypes = result;
                        })
                        .then(() => {
                            this.rooms.forEach((room) => {
                                var roomType: Roomtype = new Roomtype("", "", 0, 0, new Array<RoomImage>, new Array<Number>);
                                this.roomTypes.forEach((roomtype) => {
                                    if (roomtype.id === room.roomTypeId) {
                                        roomType = roomtype;
                                    }
                                });

                                if (roomType && roomType.name) {
                                    container.innerHTML += `
                                        <div class="rounded m-2 border-solid border-2 border-slate-600 h-min p-1.5 w-fit" >
                                            <div id="room_${room.roomNumber}" class="grid gap-5 grid-flow-col auto-cols-max w-fit m-auto">
                                                <p class="text-xl font-bold">${room.roomNumber}</p>
                                                <p class="text-neutral-600">${roomType.name}</p>
                                                <button type="button" class="modify">✏️</button>
                                                <button class="delete">🗑️</button>
                                            </div>
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

        Array.from(document.getElementsByClassName("delete")).forEach((button) => { 
            button.addEventListener("click", () => {
                const roomNumber = button.closest("div")?.id.split("_")[1];
                this.rooms.forEach((room) => {
                    if (room.roomNumber == roomNumber) {
                        this.deleteRoom(room);
                    }
                });
            });
        });

        document.querySelector("#new_room")?.addEventListener("click", () => {
            this.addRoom();
            document.querySelector("#new_room")?.classList.add("hidden");
        });
        

    }

    private modifyRoom(room: Room) {
        const page = new RoomsEditPage(this, true);
        page.show(room);
    }
  
    private addRoom() { 
        const page = new RoomsEditPage(this, false);
        page.show();
    }

    private deleteRoom(room: Room) { 
        console.log(room);
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Authorization": this.token
            },
            redirect: "follow" as RequestRedirect | undefined
        };

        fetch(`https://hms.jedlik.cloud/api/rooms/${room.id}`, requestOptions)
            .then((response) => response.text())
            .then(() => this.fillContainer())
            .catch((error) => console.error(error));
    }
}

