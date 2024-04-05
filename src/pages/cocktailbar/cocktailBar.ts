import { CocktailCard } from "../../components/cocktailCard/cocktailCard.js";
import { Page } from "../page.js";

export class CocktailBar extends Page {

    constructor() {
        super('/src/pages/cocktailBar/cocktailbar.html')
        const cocktailWrap = document.querySelector(".cocktailWrapper")
        const cocktailCard = new CocktailCard("Mojito", 10, "A refreshing cocktail", "Longdrink")
        if(cocktailWrap)
        {
            cocktailWrap.appendChild(cocktailCard.html!)
            
            
        }
    }
}