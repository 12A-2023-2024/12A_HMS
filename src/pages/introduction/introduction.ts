import { Page } from "../page.js";
import { Login } from "./login.js";
import { Scroll } from "./scroll.js";

export class IntroductionPage extends Page {

    constructor() {
        super('/src/pages/introduction/introduction.html');
    }

    override getHtmlCallback(){
        this.login()
        this.getScrollImgs()
        this.createScroll()
    }

    createScroll(){
        const container = document.querySelector<HTMLElement>('.scroll-container');
        if (container){
            new Scroll(container, 1000)
        }
    }

    getScrollImgs(){
        
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
