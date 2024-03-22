import { Page } from "../page.js";
import { Scroll } from "./scroll.js";

export class IntroductionPage extends Page {

    constructor() {
        super('/src/pages/introduction/introduction.html');
        // Időzített függvény a container lekérése után
        setTimeout(() => {
            const container = document.querySelector<HTMLElement>('.overflow-x-scroll');
            if (container){
                new Scroll(container, 3500)
            }
        }, 1000);
    }
}
