import { Room } from "./resources/room.js";
import { RoomsAdminPage } from "./rooms_admin_page.js";

const roomsAdminPage = new RoomsAdminPage(); // Required until routing is finished
addEventListeners();

function fetchRoom(room: Room) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", roomsAdminPage.token);
    const raw = JSON.stringify(room);
    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    fetch("https://hms.jedlik.cloud/api/rooms", requestOptions)
        .then((response) => response.text())
        .catch((error) => console.error(error));
}

function addEventListeners() {
    document.querySelector("form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const roomNumber = formData.get("room_number") as string;
        if (roomNumber && roomsAdminPage.selectedRoomtype?.id) {
            const room = new Room(roomNumber, roomsAdminPage.selectedRoomtype.id);
            fetchRoom(room);
        }
    });
}