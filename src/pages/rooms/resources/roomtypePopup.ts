import { RoomsAdminPage } from "../rooms_admin.js";
import { Roomtype } from "./roomtype";

export class RoomtypePopup {
    parentPage: RoomsAdminPage;

    constructor(parentPage: RoomsAdminPage) {
        this.parentPage = parentPage;
        this.initializeWindow();
    }

    private initializeWindow() {
        getRoomTypes(this.parentPage);
    }

    show() {
        const roomtypePopup: HTMLElement | null = document.querySelector("#roomtype_popup");
        if (roomtypePopup) {
            roomtypePopup.style.display = "block";
        }
    }

    hide() {
        const roomtypePopup: HTMLElement | null = document.querySelector("#roomtype_popup");
        if (roomtypePopup) {
            roomtypePopup.style.display = "none"
        }
    }
}

async function getRoomTypes(parentPage: RoomsAdminPage): Promise<Roomtype[]> {
    let roomtypes: Roomtype[] = [];
    const requestOptions: RequestInit = {
        method: "GET",
        headers: { "Authorization": parentPage.token },
        redirect: "follow" as RequestRedirect | undefined
    }

    const response = await fetch("https://hms.jedlik.cloud/api/rooms/types", requestOptions);
    const result = await response.json();
    roomtypes.push(...result.map((roomtype: any) => {
        if (roomtype.active) {
            new Roomtype(roomtype.name, roomtype.description, roomtype.pricePerNightPerPerson,
                roomtype.capacity, roomtype.images, roomtype.parameters, roomtype.id, roomtype.active);
        }
    }));

    return roomtypes;
}