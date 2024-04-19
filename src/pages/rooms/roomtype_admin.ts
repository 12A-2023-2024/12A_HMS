import { RoomtypeAdminPage } from "./roomtype_admin_page.js";
import { Roomtype } from "./resources/roomtype.js";
import { RoomImage } from "./resources/image.js";
import { Parameter } from "./resources/parameter.js";
import { Extras } from "./extras.js";

const page = new RoomtypeAdminPage();    //Requred until routing is finished 

//!!Error 413 payload too large

document.querySelector("input[type='file']")?.addEventListener("change", (e) => {
    const formData = new FormData(document.querySelector("form") as HTMLFormElement);
    const formImages = formData.getAll("images");
    page.images = convertImagesArrayToBase64(formImages as File[]);
});

document.querySelector("form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("roomtype_name") as string;
    const description = formData.get("description") as string;
    const pricePerNightPerPerson = Number(formData.get("price"));
    const capacity = Number(formData.get("capacity"));
    const parameters : Number[] = [];
    
    let roomtype : Roomtype = new Roomtype(name, description, pricePerNightPerPerson, capacity, page.images, parameters);
    fetchRoomtype(roomtype);
});

function convertImagesArrayToBase64(formImages : File[]){
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

const fileToBase64 = (file: File) : Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).replace('data:', '').replace(/^.+,/, ''));
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

function fetchRoomtype(roomtype : Roomtype){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", page.token);

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
