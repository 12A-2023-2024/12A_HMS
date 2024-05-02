import { RoomsAdminPage } from "../rooms_admin_page.js";
import { Roomtype } from "./roomtype.js";

export class RoomtypeSelector {
    parentPage: RoomsAdminPage;
    roomtypes : Roomtype[] = new Array<Roomtype>();

    constructor(parentPage: RoomsAdminPage) {
        this.parentPage = parentPage;
        this.initializeWindow();
    }

    private initializeWindow() {
        getRoomTypes(this.parentPage)
        .then((result) => {
            this.roomtypes = result;
            fillSelectorContainer(this.roomtypes);
        });
    }
}

async function getRoomTypes(parentPage: RoomsAdminPage): Promise<Roomtype[]> {
    let roomtypes: Roomtype[] = new Array<Roomtype>();
    const requestOptions: RequestInit = {
        method: "GET",
        headers: { "Authorization": parentPage.token },
        redirect: "follow" as RequestRedirect | undefined
    }
    const response = await fetch("https://hms.jedlik.cloud/api/rooms/types", requestOptions);
    const result = await response.json();
    roomtypes.push(...result.map((roomtype: any) => {
        new Roomtype(roomtype.name, roomtype.description, roomtype.pricePerNightPerPerson,
            roomtype.capacity, roomtype.images, roomtype.parameters, roomtype.id, roomtype.active);
        }));
        console.log(result);
    return roomtypes;
}

function fillSelectorContainer(roomtypes: Roomtype[]) {
    const container = document.querySelector("#roomtype_container");
    if (container) {
        container.innerHTML = "";
        roomtypes.forEach((roomtype: Roomtype) => {
            container.innerHTML += `<p id="p_${roomtype.id}" style="display:inline;">${roomtype.name}</p>`;
            container.innerHTML += `<button type="button" id="modify_${roomtype.id}" class="modify">✏️</button>`;
            container.innerHTML += `<button type="button" id="delete_${roomtype.id}" class="delete">🗑️</button><br>`;
        });
        container.innerHTML += `<input type="text" id="name" placeholder="Elnevezés" style="display:none;">`;
        container.innerHTML += `<button type="button" id="confirm" style="display:none;">✅</button>`;
    }
}