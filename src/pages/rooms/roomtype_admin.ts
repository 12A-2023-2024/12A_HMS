import { RoomtypeAdminPage } from "./roomtype_admin_page.js";
import { Roomtype } from "./resources/roomtype.js";
import { RoomImage } from "./resources/image.js";

const page = new RoomtypeAdminPage();    //Requred until routing is finished 
addEventListeners();

//!!Error 413 payload too large

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

function addEventListeners(){
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
        
        let roomtype : Roomtype = new Roomtype(name, description, pricePerNightPerPerson, capacity, page.images, page.extrasPopup?.selectedParameters as Number[]);
        fetchRoomtype(roomtype);
    });

    document.querySelector("#extras")?.addEventListener("click", () => {
        page.extrasPopup?.show();
    });

    document.querySelector("#close")?.addEventListener("click", () => {
        page.extrasPopup?.hide();
    });

    document.querySelector("#extras_submit")?.addEventListener("click", () => {
        let extras : Number[] = [];
        const extrasPopupForm = document.querySelector("#extras_popup form");
        const selectedExtras = extrasPopupForm?.querySelectorAll("input[type='checkbox']:checked");
        selectedExtras?.forEach((extra) => {
            extras.push(Number(extra.getAttribute("value")));
        });
        if (page.extrasPopup) {
            page.extrasPopup.selectedParameters = [];
        }
        page.extrasPopup?.parameters.forEach((parameter) => {
            if (extras.includes(parameter.id as Number)) {
                page.extrasPopup?.selectedParameters.push(parameter.id as Number);
            }
        });
        page.extrasPopup?.hide();
    });

    document.querySelector("#extras_new")?.addEventListener("click", () => {
        const extrasForm = document.querySelector("#extras_popup form");
        if (extrasForm) {
            const confirmButton = document.querySelector("#confirm") as HTMLElement;
            const textInput = document.querySelector("#name") as HTMLElement;
            confirmButton.style.display = "block";
            textInput.style.display = "block";
            document.querySelector("#confirm")?.addEventListener("click", () => {
                page.extrasPopup?.newParameter((extrasForm.querySelector("input[type='text']") as HTMLInputElement).value);
                confirmButton.style.display = "none";
                textInput.style.display = "none";
            });
        }
    });
}
