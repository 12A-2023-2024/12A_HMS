import { RoomImage } from "./image";
import { fileToBase64 } from "./rooms_admin";
import { Roomtype } from "./roomtype";

let roomtype;

document.querySelector("form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("roomtype_name") as string;
    const description = formData.get("description") as string;
    const pricePerNightPerPerson = Number(formData.get("price"));
    const capacity = Number(formData.get("capacity"));
    const active = true;
    const formImages = formData.getAll("images");
    const images = [];
    formImages.forEach((image) => {
        if (image instanceof File) {
            fileToBase64(image).then((base64) => {
                images.push(new RoomImage(image.name, base64));
            });
        }
    })
    const parameters = [];

    roomtype = new Roomtype()
});