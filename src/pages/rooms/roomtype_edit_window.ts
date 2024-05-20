import { RoomtypeAdminPage } from "./roomtype_admin_page.js";
import { Roomtype } from "./resources/roomtype.js";
import { RoomImage } from "./resources/image.js";

export class RoomTypeEditPage {
    parentPage: RoomtypeAdminPage;
    modify: boolean = false;

    constructor(parentPage: RoomtypeAdminPage, modify: boolean) {
        this.parentPage = parentPage;
        this.modify = modify;
    }

    public show(roomtype?: Roomtype) {
        if (this.modify && roomtype) {
            this.fillInputs(roomtype);
            this.addEventListeners(roomtype);
        }
        else {
            this.addEventListeners();
        }
        const window = document.querySelector("#roomtype_edit") as HTMLElement;
        window.style.display = "block";
    }

    public hide() {
        const window = document.querySelector("#roomtype_edit") as HTMLElement;
        window.style.display = "none";
    }

    private addEventListeners(modifiedRoomtype?: Roomtype) {
        document.querySelector("input[type='file']")?.addEventListener("change", (e) => {
            const formData = new FormData(document.querySelector("form") as HTMLFormElement);
            const formImages = formData.getAll("images");
            this.parentPage.images = convertImagesArrayToBase64(formImages as File[]);
        });

        document.querySelector("#roomtype_form")?.addEventListener("submit", (e) => {
            document.querySelector("#new_roomtype")?.classList.remove("hidden");
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get("roomtype_name") as string;
            const description = formData.get("description") as string;
            const pricePerNightPerPerson = Number(formData.get("price"));
            const capacity = Number(formData.get("capacity"));

            if (modifiedRoomtype && this.modify) {
                const rt = new Roomtype(name, description, pricePerNightPerPerson, capacity, this.parentPage.images, this.parentPage.extrasPopup?.selectedParameters as Number[], modifiedRoomtype.id as Number, true)
                this.modifyRoomtype(rt);
            }
            else {
                this.newRoomtype(new Roomtype(name, description, pricePerNightPerPerson, capacity, this.parentPage.images, this.parentPage.extrasPopup?.selectedParameters as Number[]));
            }
        });

        document.querySelector("#extras")?.addEventListener("click", () => {
            this.parentPage.extrasPopup?.show();
        });

        document.querySelector("#close")?.addEventListener("click", () => {
            this.parentPage.extrasPopup?.hide();
        });
        
        document.querySelector("#closebutton")?.addEventListener("click", () => {
            this.hide();
            document.querySelector("#new_roomtype")?.classList.remove("hidden");
            this.parentPage.extrasPopup?.hide();
        });

        document.querySelector("#extras_submit")?.addEventListener("click", () => {
            let extras: Number[] = [];
            const extrasPopupForm = document.querySelector("#extras_popup form");
            const selectedExtras = extrasPopupForm?.querySelectorAll("input[type='checkbox']:checked");
            selectedExtras?.forEach((extra) => {
                extras.push(Number(extra.getAttribute("value")));
            });
            if (this.parentPage.extrasPopup) {
                this.parentPage.extrasPopup.selectedParameters = [];
            }
            this.parentPage.extrasPopup?.parameters.forEach((parameter) => {
                if (extras.includes(parameter.id as Number)) {
                    this.parentPage.extrasPopup?.selectedParameters.push(parameter.id as Number);
                }
            });
            this.parentPage.extrasPopup?.hide();
        });

        document.querySelector("#extras_new")?.addEventListener("click", () => {
            const extrasForm = document.querySelector("#extras_popup form");
            if (extrasForm) {
                const confirmButton = document.querySelector("#confirm") as HTMLElement;
                const textInput = document.querySelector("#name") as HTMLElement;
                confirmButton.style.display = "block";
                textInput.style.display = "block";
                document.querySelector("#confirm")?.addEventListener("click", () => {
                    this.parentPage.extrasPopup?.newParameter((extrasForm.querySelector("input[type='text']") as HTMLInputElement).value);
                    confirmButton.style.display = "none";
                    textInput.style.display = "none";
                });
            }
        });
    }

    private fillInputs(roomtype: Roomtype) {
        document.querySelector("input[name='roomtype_name']")?.setAttribute("value", roomtype.name);
        const descriptionTextarea = document.querySelector("textarea[name='description']");
        if (descriptionTextarea) {
            descriptionTextarea.innerHTML = roomtype.description;
        }
        document.querySelector("input[name='price']")?.setAttribute("value", roomtype.pricePerNigthPerPerson.toString());
        document.querySelector("input[name='capacity']")?.setAttribute("value", roomtype.capacity.toString());

    }

    private newRoomtype(roomtype: Roomtype) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", this.parentPage.token);

        const raw = JSON.stringify(roomtype);

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://hms.jedlik.cloud/api/rooms/types", requestOptions)
            .then(() => {
                this.hide();
                this.parentPage.fillContainer();
            });
    }

    private modifyRoomtype(roomtype: Roomtype) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", this.parentPage.token);
        const raw = JSON.stringify(roomtype);
        console.log(raw);
        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect | undefined
        }
        fetch(`https://hms.jedlik.cloud/api/rooms/types`, requestOptions)
            .then(() => {
                this.hide();
                this.parentPage.fillContainer();
            });
    }
}

function convertImagesArrayToBase64(formImages: File[]) {
    const images: RoomImage[] = [];
    formImages.forEach((image) => {
        if (image instanceof File) {
            fileToBase64(image).then((base64) => {
                images.push(new RoomImage(image.name, base64));
            });
        }
    })
    return images;
}

export const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).replace('data:', '').replace(/^.+,/, ''));
    reader.onerror = reject;
    reader.readAsDataURL(file);
});



