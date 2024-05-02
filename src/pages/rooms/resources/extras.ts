import { Parameter } from "./parameter";
import { RoomtypeAdminPage } from "../roomtype_admin_page";

export class Extras {
    parentPage: RoomtypeAdminPage;
    parameters: Parameter[] = new Array<Parameter>;
    selectedParameters: Number[] = [];

    constructor(parentPage: RoomtypeAdminPage) {
        this.parentPage = parentPage;
        this.initializeWindow();
    }

    show() {
        const extrasPopup: HTMLElement | null = document.querySelector("#extras_popup");
        if (extrasPopup) {
            extrasPopup.style.display = "block";
        }
    }

    hide() {
        const extrasPopup: HTMLElement | null = document.querySelector("#extras_popup");
        if (extrasPopup) {
            this.initializeWindow();
            extrasPopup.style.display = "none";
        }
    }

    private initializeWindow() {
        getAllParameters(this.parentPage)
            .then((result) => {
                this.parameters = result;
                createPopupWindow(this.parameters);
                this.addEventListeners();
            })
            .catch((error) => console.error(error));
    }


    newParameter(parameterName: string) {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: {
                "Authorization": this.parentPage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: parameterName }),
            redirect: "follow" as RequestRedirect | undefined
        }
        console.log(requestOptions);

        fetch("https://hms.jedlik.cloud/api/rooms/parameters", requestOptions)
            .then((response) => response.text())
            .catch((error) => console.error(error));

        this.initializeWindow();
    }

    private deleteParameter(parameterId: string) {
        const requestOptions: RequestInit = {
            method: "DELETE",
            headers: { "Authorization": this.parentPage.token },
            redirect: "follow" as RequestRedirect | undefined
        }

        fetch(`https://hms.jedlik.cloud/api/rooms/parameters/${parameterId}`, requestOptions)
            .then((response) => response.text())
            .then(() => this.initializeWindow())
            .catch((error) => console.error(error));
    }

    private modifyParameter(parameterId: string, newName: string) {
        const requestOptions: RequestInit = {
            method: "PUT",
            headers: {
                "Authorization": this.parentPage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: parameterId,
                name: newName
            }),
            redirect: "follow" as RequestRedirect | undefined
        };

        fetch("https://hms.jedlik.cloud/api/rooms/parameters", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    private addEventListeners() {
        [...document.getElementsByClassName("delete")].forEach(button => {
            button.addEventListener("click", () => {
                this.deleteParameter(button.id.split("_")[1]);
            });
        });

        [...document.getElementsByClassName("modify")].forEach(button => {
            button.addEventListener("click", () => {
                const parameterId = button.id.split("_")[1];
                const inputElement = document.querySelector(`input[type='checkbox'][value='${parameterId}']`);
                const parameterName = document.querySelector(`#p_${parameterId}`);
                const deleteButton = document.getElementById(`delete_${parameterId}`);
                if (inputElement && parameterName && deleteButton) {
                    inputElement.outerHTML = `<input type="text" id="name" value="${parameterName.innerHTML}">`;
                    parameterName.outerHTML = "";
                    button.outerHTML = "<button type='button' id='confirm_modification'>✅</button>";
                    deleteButton.outerHTML = "<button type='button' id='cancel_modification'>❌</button>";
                    document.querySelector("#confirm_modification")?.addEventListener("click", () => {
                        this.modifyParameter(parameterId, (document.querySelector("#name") as HTMLInputElement).value);
                        this.initializeWindow();
                    });
                    document.querySelector("#cancel_modification")?.addEventListener("click", () => {
                        this.initializeWindow();
                    });
                }
            });
        });
    }
}

async function getAllParameters(parentPage: RoomtypeAdminPage): Promise<Parameter[]> {
    let parameters: Parameter[] = new Array<Parameter>;
    const requestOptions: RequestInit = {
        method: "GET",
        headers: { "Authorization": parentPage.token },
        redirect: "follow" as RequestRedirect | undefined
    }

    const response = await fetch("https://hms.jedlik.cloud/api/rooms/parameters", requestOptions);
    const result = await response.json();
    parameters.push(...result.map((parameter: any) => new Parameter(parameter.name, parameter.id)));

    return parameters;
}

function createPopupWindow(parameters: Parameter[]) {
    const extrasPopupForm = document.querySelector("#extras_popup form");
    if (extrasPopupForm) {
        extrasPopupForm.innerHTML = "";
        parameters.forEach((parameter: Parameter) => {
            extrasPopupForm.innerHTML += `<input type="checkbox" value="${parameter.id}"><p id="p_${parameter.id}" style="display:inline;">${parameter.name}</p>`;
            extrasPopupForm.innerHTML += `<button type="button" id="modify_${parameter.id}" class="modify">✏️</button>`;
            extrasPopupForm.innerHTML += `<button type="button" id="delete_${parameter.id}" class="delete">🗑️</button><br>`;
        });
        extrasPopupForm.innerHTML += `<input type="text" id="name" placeholder="Elnevezés" style="display:none;">`;
        extrasPopupForm.innerHTML += `<button type="button" id="confirm" style="display:none;">✅</button>`;
    }
}
