import { Page } from "../page.js";
import { Hir } from "./hir.js";

export class NewsPage extends Page {

    constructor() {
        super('/src/pages/news/news.html')
        this.generateNews()
    }

    generateNews(){
        let title = "haha";
        let text = "lorem";
        let source = "";
        let alt = "alt";

        new Hir(title,text,source,alt);
        
    }
}