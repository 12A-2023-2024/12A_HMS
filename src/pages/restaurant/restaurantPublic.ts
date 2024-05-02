import { Page } from "../page.js";
import { ICategory } from "./interfaces/category.js";
import { IMeal } from "./interfaces/meal.js";
export class RestaurantPublicPage extends Page {
    categories: ICategory[] = [];
    meals: IMeal[] = [];
  constructor() {
    super("/src/pages/restaurant/restaurantPublic.html");
  }

}
// class MenuItem {
//     public id: number;
//     public name: string;
//     public price: number;
//     public description: string;
//     public categoryId: number;
//     public images: [];

//     constructor(id: number, name: string, price: number, description: string, categoryId: number, images: []) {
//         this.id = id;
//         this.name = name;
//         this.price = price;
//         this.description = description;
//         this.categoryId = categoryId;
//         this.images = images;
//     }
// }

function makeMenuItemHtml(item: IMeal): void {
    let card = document.createElement("div");
    card.classList.add("h-96", "w-96", "flex", "flex-col", "shadow-lg", "p-5", "rounded-2xl", "divide-y-2");
    let imageContainer = document.createElement("div");
    imageContainer.classList.add("h-5/6", "w-full", "p-3");
    let image = document.createElement("img");
    image.classList.add("object-fill", "h-full");   // todo: image src
    imageContainer.appendChild(image);
    card.appendChild(imageContainer);
    let info = document.createElement("div");
    info.classList.add("h-1/6", "w-full", "flex", "flex-row", "items-center", "justify-between", "p-2");
    card.appendChild(info);
    let nameContainer = document.createElement("div");
    nameContainer.classList.add("flex-grow", "flex", "items-center");
    card.appendChild(nameContainer);

    card.addEventListener('click', (event) => {
        // todo: expand with description
    });

    document.querySelector("content-start")?.appendChild(card);
}

function getMenuItems(): void {
//    this.fetch('https://hms.jedlik.cloud/api/restaurant/menuitems', 'GET')
}
