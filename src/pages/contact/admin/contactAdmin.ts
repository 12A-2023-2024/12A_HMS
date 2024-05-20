import { Page } from "../../page.js";
import { Login } from "../../introduction/login.js";
import { ContactsPartialModel } from "./contactsPartialModel.js";

export class ContactAdminPage extends Page {

    data: ContactsPartialModel | undefined
    constructor() {
        super('/src/pages/contact/admin/contactAdmin.html');
    }

    override getHtmlCallback(): void {
        this.login().then(_ =>{
            this.getDatas().then(x => {
                this.initPage();
                this.setValues();
            })
        })
    }
    async getDatas(){
        const url: string = "https://hms.jedlik.cloud/api/about/contact";
        const method: string = "GET";
        await this.fetch<ContactsPartialModel>(url, method).then(
            result => {
                this.data = result;
            }
        );
    }
    initPage(){
        if (!this.data){
            return;
        }
        this.createInputField("email", "email")
        this.createInputField("telephone", "telefonszám")
        this.createInputField("taxNumber", "adószám")
        this.createInputField("city", "város")
        this.createInputField("address", "cím")
        this.createInputField("postalCode", "irányítószám")
        const modifyButton = this.querySelector<HTMLInputElement>("#modifyButton");
        modifyButton.classList.remove("collapse");
        modifyButton.addEventListener("click", () => this.modify())
    }

    async modify() {
        if (!this.data){
            return;
        }
        var putModel = new ContactsPartialModel();
        this.iterateFields(element => {
            if (!this.data){
                return;
            }
            putModel[element.id] = element.value;
        })
        const endpoint = "https://hms.jedlik.cloud/api/about/contact";
        const method: string = "PUT";
        await this.fetch(endpoint, method, putModel);
    }

    iterateFields(action: (element: HTMLInputElement) => void){
        if (!this.data){
            return;
        }
        for (const key of Object.keys(this.data)) {
            if (key == "socialmedias") {
                continue;
            }
            const inputField = this.querySelector<HTMLInputElement>(`#${key}`);
            action(inputField);
        }
    }

    setValues(){
        if (!this.data){
            return;
        }
        this.iterateFields(element => {
            if (!this.data){
                return;
            }
            element.value = this.data[element.id] as string ?? ""
        })
    }

    createInputField(name: string, placeholder: string){

        let inputField = `<div class="space-x-10 mt-3">
                            <label class="text-xl" for="${name}">${placeholder}:</label>
                            <input class="justify-self-end bg-gray-300 border-2 border-slate-950 px-2.5" type="text" id="${name}" name="${name}" placeholder="${placeholder}">
                          </div>`
        this.querySelector<HTMLElement>("#inputFields").innerHTML += inputField;
    }

    async login(){
        const url: string = "https://hms.jedlik.cloud/api/login"
        const method: string = "POST"
        const body: any= {
            "loginName": "admin",
            "password": "admin"
        }
        const data = this.fetch<Login>(url, method, body)
        await data.then( (result) => {
            localStorage.setItem('user', JSON.stringify(result));
        })
    }
}