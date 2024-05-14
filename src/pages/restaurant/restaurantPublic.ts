import { Page } from "../page.js";
import { ICategory } from "./interfaces/category.js";
import { IMeal } from "./interfaces/meal.js";
export class RestaurantPublicPage extends Page {
    categories: ICategory[] = [];
    meals: IMeal[] = [];
  constructor() {
    super("/src/pages/restaurant/restaurantPublic.html");
    this.makeMenuItems();
  }

makeMenuItemHtml(item: IMeal): void {
    let card = document.createElement("div");
    card.classList.add("h-96", "w-96", "flex", "flex-col", "shadow-lg", "p-5", "rounded-2xl", "divide-y-2");
    card.id = item.name;

    let imageContainer = document.createElement("div");
    imageContainer.classList.add("h-5/6", "w-full", "p-3");
    let image = document.createElement("img");
    image.classList.add("object-fill", "h-full");
    image.src = item.imageUrls[0];
    imageContainer.appendChild(image);
    card.appendChild(imageContainer);

    let description = document.createElement("div");
    description.id = item.name + "_description";
    description.innerText = item.description;
    description.classList.add("invisible", "w-full", "h-fit");
    card.appendChild(description);

    let info = document.createElement("div");
    info.classList.add("h-1/6", "w-full", "flex", "flex-row", "items-center", "justify-between", "p-2");
    let nameContainer = document.createElement("div");
    nameContainer.classList.add("flex-grow", "flex", "items-center");
    let p = document.createElement("p");
    p.innerText = item.name;
    nameContainer.appendChild(p);
    let p2 = document.createElement("p");
    p2.classList.add("font-bold");
    p2.innerText = item.price.toString() + " Ft";
    info.appendChild(nameContainer);
    info.appendChild(p2);
    card.appendChild(info);


    card.addEventListener('click', (event) => {
        if (document.getElementById(item.name+"_description")?.classList.contains("invisible")) {
            document.getElementById(item.name+"_description")?.classList.remove("invisible");
            document.getElementById(item.name)?.classList.remove("h-96");
            document.getElementById(item.name)?.classList.add("h-fit")
        } else {
            document.getElementById(item.name+"_description")?.classList.add("invisible");
            document.getElementById(item.name)?.classList.add("h-96");
            document.getElementById(item.name)?.classList.remove("h-fit");
        }

    });

    document.querySelector(".content-start")?.appendChild(card);
}

async getMenuItems(): Promise<void> {
        try {
            const arr = await this.fetch<IMeal[]>('https://hms.jedlik.cloud/api/publicpages/menuitems', 'GET');
            this.meals = arr;
        } catch (error) {
            console.error("Error fetching menu items:", error);
        }
    }


 async makeMenuItems() : Promise<void> {
     await this.getMenuItems();
     console.log(this.meals.length)
     this.meals.forEach(meal => {
         this.makeMenuItemHtml(meal);
         console.log(meal.name);
     });
}
}
