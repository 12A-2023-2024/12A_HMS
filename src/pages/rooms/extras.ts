import { Parameter } from "./resources/parameter.js";
import { RoomtypeAdminPage } from "./roomtype_admin_page.js";

export class Extras{
    parentPage : RoomtypeAdminPage;
    parameters : Parameter[] = new Array<Parameter>; 

    constructor(parentPage : RoomtypeAdminPage){
        this.parentPage = parentPage;
        getAllParameters(this.parentPage)
            .then((result) => {
                this.parameters = result;
                createPopupWindow(this.parameters);
            })
            .catch((error) => console.error(error));
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
        parameters.forEach((parameter : Parameter) => {
            extrasPopupForm.innerHTML += `<input type="checkbox" value="${parameter.id}">${parameter.name}</input>`;
        });
    }
}