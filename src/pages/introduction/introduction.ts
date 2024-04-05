import { Page } from "../page.js";
import { Scroll } from "./scroll.js";

export class IntroductionPage extends Page {

    constructor() {
        super('/src/pages/introduction/introduction.html');
    }

    override getHtmlCallback(){
        console.log("eeeh2")
        this.getScrollImgs()
        this.createScroll()
    }

    createScroll(){
        const container = document.querySelector<HTMLElement>('.scroll-container');
        if (container){
            new Scroll(container, 1000)
            console.log("heeee")
        }
    }

    getScrollImgs(){
        
    }
}
