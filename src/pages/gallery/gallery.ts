import { Page } from "../page.js";

export class GalleryPage extends Page {

    constructor() {
        super('/src/pages/gallery/gallery.html');
    }

    loadImages(){
        this.addImage(`data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`)
        // var endpoint = ""
        // this.fetch<any>(endpoint, "", "")
    }

    addImage(base64image: string){
        let div = this.querySelector<HTMLDivElement>("#gallery");
        let image = this.createElement<HTMLImageElement>("img");
        image.src = base64image;
        div.appendChild(image);
    }

    override getHtmlCallback(){
        this.loadImages();
    }
}