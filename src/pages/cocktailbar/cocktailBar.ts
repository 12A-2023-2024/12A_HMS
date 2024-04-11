import { CocktailCard } from "../../components/cocktailCard/cocktailCard.js";
import { Page } from "../page.js";

export class CocktailBar extends Page {

    constructor() {
        super('/src/pages/cocktailBar/cocktailbar.html')
        const cocktailWrap = document.querySelector("body")
        const cocktailCard = new CocktailCard("Fiinom valami", 60, "THE only cocktail", "Longdrink", "https://baristacoffee.ca/img/Recette-Expresso-Martini.png", ".cocktailWrapper" )
        
    }
}