import { Page } from "../page.js";
<<<<<<< HEAD

export class IntroductionPage extends Page {

    constructor() {
        super('/src/pages/introduction/introduction.html')
    }
}
=======
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
        this.getDatas()
    }

    createScroll(){
        const container = document.querySelector<HTMLElement>('.scroll-container');
        if (this.data && container){
            this.data.sort((a, b) => a.order - b.order);
            this.data.forEach(model => {
                if (model.section === "carousel"){
                    container.innerHTML += `<div
                    class="snap-center w-full flex-shrink-0 flex items-center justify-center text-8xl">
                        <img class="object-cover w-full max-h-80 cursor-pointer" src="${model.pictureUrl}" alt="${model.alt}" href="${model.href}" onclick="window.open('${model.href}')">
                    </div>`
                }
            });
        }else{
        }

        if (container){
            new Scroll(container, 2000)
        }
    }

    createBanner(){
        const container = document.querySelector<HTMLElement>('.banner-main');
        if (this.data && container){
            this.data.sort((a, b) => a.order - b.order);
            this.data.forEach(model =>{
                if (model.section === "banner"){
                    const title: string[] | undefined = model.text?.split("<li>")
                    let listElement: string | undefined = ""
                    if (title){
                        const kezdetIndex = model.text?.indexOf(title[0]);
    
                        // Ha található a "kezdet" a szövegben
                        if (kezdetIndex != undefined){
                            if (kezdetIndex !== -1) {
                                listElement = model.text?.substring(kezdetIndex + title[0].length);
                            } else {
                            }
                        }
                        const li: string | undefined = model.text
                        container.innerHTML += `
                        <div class="box-border lg:w-2/7 md:w-5/12 p-4 border-4 mt-11">
                        <h2 class="text-lg font-bold text-center xl:mb-6 sm:mb-3">${title[0]}</h2>
                        <div class="flex md:flex-col xl:flex-row">
                            <img  class="mx-auto lg:order-last box-border h-1/2 w-1/2 cursor-pointer" src="${model.pictureUrl}" alt="${model.alt} href="${model.href}" onclick="window.open('${model.href}')">
                            <ul class="banner-list list-disc mx-10">
                                ${listElement}
                            </ul>
                        </div>
                    </div>
                        `
                    }

                }
            })
        }else{
        }
    }


    getDatas(){
        const url: string = "https://hms.jedlik.cloud/api/about/introduction";
        const method: string = "GET";
        this.fetch<introductionModel[]>(url, method).then(
            result => {
                this.data = result;
                this.createScroll();
                this.createBanner();
            }
        );
    }

    login(){
        const url: string = "https://hms.jedlik.cloud/api/login"
        const method: string = "POST"
        const body: any= {
            loginName: "admin",
            password: "admin"
         }
        const data = this.fetch<Login>(url, method, body)
        data.then( (result) => {
            localStorage.setItem('user', JSON.stringify(result));
        })
    }




}
>>>>>>> 3f5f50da225f197a4478f1f26a443cefdaa34ffb
