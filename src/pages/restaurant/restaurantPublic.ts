import { Page } from "../page.js";

export class RestaurantPublicPage extends Page {
  constructor() {
    super("/src/pages/restaurant/restaurantPublic.html");
  }
    
}
class MenuItem {
    public id: number;
    public name: string;
    public price: number;
    public description: string;
    public categoryId: number;
    public images: [];

    constructor(id: number, name: string, price: number, description: string, categoryId: number, images: []) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.categoryId = categoryId;
        this.images = images;
    }
}
