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
    card.classList.add("h-96", "w-96", "flex", "flex-col", "shadow-lg", "p-5", "rounded-2xl", "divide-y-2", "border");
    card.id = item.name;

    let imageContainer = document.createElement("div");
    imageContainer.classList.add("h-5/6", "w-full", "p-3");
    let image = document.createElement("img");
    image.classList.add("object-fill", "h-64");
    image.src = item.imageUrls[0];
    imageContainer.appendChild(image);
    card.appendChild(imageContainer);

    let description = document.createElement("div");
    description.id = item.name + "_description";
    let pa = document.createElement("p");
    pa.innerText = item.description;
    pa.classList.add("truncate");
    description.classList.add("invisible", "w-full", "h-fit", "text-wrap");
    description.appendChild(pa);
    card.appendChild(description);

    let info = document.createElement("div");
    info.classList.add("h-14", "w-full", "flex", "flex-row", "items-center", "justify-between", "p-2");
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
     this.getCategories();
     this.addCategories();
     for (let cat of this.categories) {
         this.makeCategory(cat);
     }
}

    getCategories() : void {
        this.meals.forEach(meal =>{
            if (!this.isInCategories(meal.categoryId)) {
                this.categories.push({
                    id: meal.categoryId,
                    name: meal.categoryName,
                    active: false
            });
                console.log("isincategory")
            }
        })
    }

    isInCategories(categoryId:number) : boolean {
        for (let cat of this.categories) {
            if (cat.id == categoryId) {
                return true;
            }
        }
        return false;
    }

    comboboxChanged(event: Event): void {
        for (let cat of this.categories) {
            const target = event.target as HTMLSelectElement;
            if (cat.name == target.value) {
                cat.active = true;
                document.querySelector(".content-start")!.innerHTML = "";
                this.makeCategory(cat);
            } else {
                cat.active = false;
            }
        }
    }

    addCategories(): void {
        let combobox = document.createElement("select");
        combobox.id  = "categorySelector";
        combobox.classList.add("text-xl", "font-bold", "p-4", "rounded-md");
        let blank = document.createElement("option");
        blank.setAttribute("disabled", "diabled");
        blank.setAttribute("selected", "selected");
        blank.innerHTML = "Kategória";
        combobox.appendChild(blank);
        for (let cat of this.categories) {
            let option = document.createElement("option");
            option.id = cat.id.toString();
            option.value = cat.name;
            option.innerHTML = cat.name;
            combobox.appendChild(option);
        }
        combobox.addEventListener("change", this.comboboxChanged.bind(this));
        document.getElementById("combobox-container")?.appendChild(combobox);
    }

    makeCategory(cat: ICategory) : void {
        let header = document.createElement("div");
        header.classList.add("w-full", "text-left", "text-3xl", "font-bold", "mt-10");
        header.innerText = cat.name;

        let line = document.createElement("hr");
        line.classList.add("my-3", "w-full");
        header.appendChild(line);

        document.querySelector(".content-start")?.appendChild(header);

        for (let meal of this.meals) {
            if (meal.categoryId == cat.id) {
                this.makeMenuItemHtml(meal);
            }
        }
    }


}
