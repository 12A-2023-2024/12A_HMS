import { CocktailCard } from "../../components/cocktailCard/cocktailCard.js";
import { CocktailNav } from "../../components/cocktailNav/cocktailNav.js";
import { Page } from "../page.js";
import { ctQueries } from "./queries.js";

export class CocktailBar extends Page {

    query: ctQueries | null = null;
    constructor() {

        super('/src/pages/cocktailBar/cocktailbar.html')
        const cocktailWrap = document.querySelector("body")
        const cocktailCards = [];
        for (let i = 0; i < 10; i++) {
            cocktailCards.push(new CocktailCard("Fiinom valami", 60, "THE only cocktail", "Longdrink", "https://baristacoffee.ca/img/Recette-Expresso-Martini.png", ".cocktailWrapper" ))
            
        }
        this.query = new ctQueries();
        const navItems = [];
        this.query.getCategories().then((result)=>{
            console.log(result)
            result.forEach(({id, name})=>{
                navItems.push(new CocktailNav(id, name, ".ctLocalNavigation"))
            })

            
        })
        
            
        }



}