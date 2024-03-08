import { GalleryItemModel } from "../../model/galleryItemModel.js";
import { Page } from "../page.js";

export class GalleryPage extends Page {

    constructor() {
        super('/src/pages/gallery/gallery.html');
    }

    loadImages(){
        let endpoint = "https://hms.jedlik.cloud/api/QueryDatabase/gallery";
        let galleryItemsRequest = this.fetch<GalleryItemModel[]>(endpoint, "GET");
        galleryItemsRequest.then(items => {
            let div = this.querySelector<HTMLDivElement>("#gallery");
            let imageColumns = this.querySelectorAll<HTMLDivElement>("#gallery div");
            let currentColumn = 0;
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            
            for (const item of items) {
                let imageWithLink = this.createElement<HTMLAnchorElement>("a");
                let image = this.createElement<HTMLImageElement>("img");
                imageWithLink.href = item.href;
                image.src = item.pictureUrl;
                image.alt = item.alt;
                image.dataset.id = item.id.toString();
                image.className = `h-auto max-w-full rounded-lg`;
                imageWithLink.appendChild(image);
                imageColumns[currentColumn].appendChild(imageWithLink);
                if (++currentColumn >= imageColumns.length) {
                    currentColumn = 0;
                }
            }
        })
    }

    override getHtmlCallback(){
        this.loadImages();
    }
}