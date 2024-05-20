import { Room } from "./resources/room.js";
import { RoomtypeSelector } from "./resources/roomtypeSelector.js";
import { RoomsAdminPage } from "./rooms_admin_page.js";


export class RoomsEditPage {
    parentPage: RoomsAdminPage;
    roomTypeSelector?: RoomtypeSelector;
    modify: boolean = false;

    constructor(parentPage: RoomsAdminPage, modify: boolean) {
        this.parentPage = parentPage;
        this.modify = modify;
        this.addRoomtypesToSelect();
    }

    public show(room?: Room) {
        if (this.modify && room) {
            this.fillInputs(room);
            this.addEventListeners(room);
        }
        else {
            this.addEventListeners();
        }
        const window = document.querySelector("#room_edit") as HTMLElement;
        window.style.display = "block";
    }

    public hide() {
        const window = document.querySelector("#room_edit") as HTMLElement;
        window.style.display = "none";
    }

    private addRoomtypesToSelect() {
        const select = document.querySelector("select") as HTMLSelectElement;
        select.innerHTML = "";
        this.parentPage.roomTypes.forEach((roomtype) => {
            const option = document.createElement("option");
            option.value = roomtype.id ? roomtype.id.toString() : "";
            option.text = roomtype.name;
            select.appendChild(option);
        });
    }

    private newRoom(room: Room) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", this.parentPage.token);
        const raw = JSON.stringify(room);
        console.log(raw);
        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        fetch("https://hms.jedlik.cloud/api/rooms", requestOptions)
            .then(() => {
                this.hide() 
                this.parentPage.fillContainer();
            });
    }

    private modifyRoom(room: Room) {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", this.parentPage.token);
        const raw = JSON.stringify(room);
        console.log(raw);
        const requestOptions: RequestInit = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        fetch("https://hms.jedlik.cloud/api/rooms", requestOptions)
            .then(() => {
                this.hide() 
                this.parentPage.fillContainer();
            });
    }

    private fillInputs(room: Room) {
        document.querySelector("input[name='room_number']")?.setAttribute("value", room.roomNumber);
        document.querySelector("select")?.setAttribute("value", room.roomTypeId.toString());
    }

    private addEventListeners(modifiedRoom?: Room) {
        document.querySelector("form")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const roomNumber = formData.get("room_number") as string;
            const selectedRoomtypeId = formData.get("room_type") as unknown as Number;
            if (roomNumber && selectedRoomtypeId) {
                if (this.modify && modifiedRoom) {
                    this.modifyRoom(new Room(roomNumber, selectedRoomtypeId, modifiedRoom.id));
                } else {
                    console.log("new room");
                    this.newRoom(new Room(roomNumber, selectedRoomtypeId));
                }
            }
        });
    }
}

