import { GalleryItemModel } from "../../model/galleryItemModel.js";
import { Utils } from "../../utils.js";
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
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);
            items.push(items[0]);

            let columnItemCount: number[] = [];

            
            let lowerCol = Math.floor(items.length / 3)
            let higherCol = Math.ceil(items.length / 3)
            switch (items.length % 3) {
                case 0:
                    // nothing special here
                    columnItemCount = [lowerCol, lowerCol, lowerCol]
                    break;
                case 1:
                    // middle has more
                    columnItemCount = [lowerCol, higherCol, lowerCol]
                    break;
                case 2:
                    // sides have more
                    columnItemCount = [higherCol, lowerCol, higherCol]
            }
            
            let itemIdx = 0;
            for (let rowIdx = 0; rowIdx < higherCol; rowIdx++) {
                for (let colIdx = 0; colIdx < columnItemCount.length; colIdx++) {
                    if (columnItemCount[colIdx] < 1) {
                        continue;
                    }
                    columnItemCount[colIdx]--;
                    let item = items[itemIdx++];
                    let imageWithLink = this.createElement<HTMLAnchorElement>("a");
                    let image = this.createElement<HTMLImageElement>("img");
                    imageWithLink.href = item.href;
                    image.src = item.pictureUrl;
                    image.alt = item.alt;
                    image.dataset.id = item.id.toString();
                    image.className = `h-auto max-w-full rounded-lg`;
                    imageWithLink.appendChild(image);
                    imageColumns[colIdx].appendChild(imageWithLink);
                }
            }
        })
    }

    override getHtmlCallback(){
        this.loadImages();
    }
}