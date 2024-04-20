import { Parameter } from "./resources/parameter.js";
import { RoomtypeAdminPage } from "./roomtype_admin_page.js";

export class Extras{
    parentPage : RoomtypeAdminPage;
    parameters : Parameter[] = new Array<Parameter>;
    selectedParameters : Number[] = [];

    constructor(parentPage : RoomtypeAdminPage){
        this.parentPage = parentPage;
        this.initializeWindow();
    }

    show(){
        const extrasPopup : HTMLElement | null = document.querySelector("#extras_popup");
        if (extrasPopup) {
            extrasPopup.style.display = "block";
        }
    }
    
    hide(){
        const extrasPopup : HTMLElement | null = document.querySelector("#extras_popup");
        if (extrasPopup) {
            extrasPopup.style.display = "none";
        }
    }

    private initializeWindow(){
        getAllParameters(this.parentPage)
                .then((result) => {
                    this.parameters = result;
                    createPopupWindow(this.parameters);
                })
                .catch((error) => console.error(error));
    }
    
    newParameter(parameterName : string){
        const requestOptions: RequestInit = {
            method: "POST",
            headers: { "Authorization" : this.parentPage.token, 
                        "Content-Type" : "application/json"
            },
            body: JSON.stringify({name : parameterName}),
            redirect: "follow" as RequestRedirect | undefined
        }
        console.log(requestOptions);

        fetch("https://hms.jedlik.cloud/api/rooms/parameters", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

        this.initializeWindow();
    }
}

async function getAllParameters(parentPage : RoomtypeAdminPage) : Promise<Parameter[]> {
    let parameters : Parameter[] = new Array<Parameter>;
    const requestOptions: RequestInit = {
        method: "GET",
        headers: { "Authorization" : parentPage.token},
        redirect: "follow" as RequestRedirect | undefined
    }

    const response = await fetch("https://hms.jedlik.cloud/api/rooms/parameters", requestOptions);
    const result = await response.json();
    parameters.push(...result.map((parameter : any) => new Parameter(parameter.name, parameter.id)));
        
    return parameters;
}

function createPopupWindow(parameters : Parameter[]){
    const extrasPopupForm = document.querySelector("#extras_popup form");
    if (extrasPopupForm) {
        extrasPopupForm.innerHTML = "";
        parameters.forEach((parameter : Parameter) => {
            extrasPopupForm.innerHTML += `<input type="checkbox" value="${parameter.id}">${parameter.name}</input>`;
        });
        extrasPopupForm.innerHTML += `<input type="text" id="name" placeholder="Elnevezés" style="display:none;"></input>`;
        extrasPopupForm.innerHTML += `<button type="button" id="confirm" style="display:none;">✅</button>`;
    }
}
