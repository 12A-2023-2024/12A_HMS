import { Page } from "../page.js";
import { Hir } from "./hir.js";

export class NewsPage extends Page {

    constructor() {
        super('/src/pages/news/news.html')
    }

    override getHtmlCallback(): void {
        this.generateNews()
    }

    generateNews(){

        let numberOfNews = 3

        let title = "lorem";
        let text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit tenetur natus nam ea, dolorum quasi harum assumenda dolor numquam, velit ad architecto est voluptatibus, iure dicta nisi molestias dolores ipsam!";
        let source = "https://mdbcdn.b-cdn.net/img/new/standard/city/079.jpg";
        let alt = "city";

        for (let index = 0; index < numberOfNews; index++) {
            let reverse = false
            if(index%2==1) reverse = true

            new Hir(title,text,source,alt,reverse)
            
        }
        
    }
}