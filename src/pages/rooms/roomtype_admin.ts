import { Page } from "../page.js";
import { RoomImage } from "./resources/image.js";
import { Roomtype } from "./resources/roomtype.js";

export class RoomtypeAdminPage extends Page{
    constructor(){
        super('/src/pages/rooms/roomtype_admin.html');

        let roomtype;
        document.querySelector("form")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get("roomtype_name") as string;
            const description = formData.get("description") as string;
            const pricePerNightPerPerson = Number(formData.get("price"));
            const capacity = Number(formData.get("capacity"));
            const formImages = formData.getAll("images");
            const images = convertImagesToBase64(formImages as File[]);
            const parameters : Number[] = [];
        
            roomtype = new Roomtype(name, description, pricePerNightPerPerson, capacity, images, parameters);
            fetchRoomtype(roomtype);
        });
    }
}


function convertImagesToBase64(formImages : File[]){
    const images : RoomImage[] = [];
    formImages.forEach((image) => {
        if (image instanceof File) {
            fileToBase64(image).then((base64) => {
                images.push(new RoomImage(image.name, base64));
            });
        }
    })
    return images;
}

const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

function fetchRoomtype(roomtype : Roomtype){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "");

    const raw = JSON.stringify(roomtype);

    const requestOptions : RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("https://hms.jedlik.cloud/api/rooms/types", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
