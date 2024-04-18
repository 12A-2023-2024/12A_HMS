import { Page } from "../page.js";
import { introductionModel } from "./introductionModel.js";
import { Login } from "./login.js";
import { Scroll } from "./scroll.js";

export class IntroductionPage extends Page {

    data: introductionModel[] |undefined
    constructor() {
        super('/src/pages/introduction/introduction.html');
    }

    override getHtmlCallback(){
        this.login()
        this.getScrollImgs()
    }

    createScroll(){
        const container = document.querySelector<HTMLElement>('.scroll-container');
        if (this.data && container){
            this.data.forEach(model => {
                if (model.section === "Fejrész"){
                    container.innerHTML += `<div
                    class="snap-center w-full flex-shrink-0 flex items-center justify-center text-8xl">
                    <img class="object-cover w-full max-h-80" src="${model.pictureUrl}" alt="${model.alt}">
                    </div>`
                }
            });
        }else{
            console.log("Hülye vagy 2x-esen")
        }

        if (container){
            new Scroll(container, 2000)
        }
    }

    getScrollImgs(){
        const url: string = "https://hms.jedlik.cloud/api/about/introduction";
        const method: string = "GET";
        this.fetch<introductionModel[]>(url, method).then(
            result => {
                this.data = result;
                this.createScroll();
            }
        );
    }

    login(){
        const url: string = "https://hms.jedlik.cloud/api/login"
        const method: string = "POST"
        const body: any= {
            "loginName": "admin",
            "password": "admin"
         }
        const data = this.fetch<Login>(url, method, body)
        console.log(data)
        data.then( (result) => {
            localStorage.setItem('user', JSON.stringify(result));
        })
    }
}
