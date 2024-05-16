import { CocktailCard } from "./components/cocktailCard/cocktailCard.js";
import { CocktailNav } from "./components/cocktailNav/cocktailNav.js";
import { Page } from "../page.js";
import { ctQueries } from "./queries.js";
import { CocktailCardBuyer } from "./components/cocktailNavProMax5gSpecialEditionEXLUSIVEPreorderBonus4kCollectorsEdition/cocktailCardBuyer.js";

export class CocktailOrder extends Page {

    query: ctQueries | null = null;
    cocktailCards: CocktailCard[] | null = null;
    navItems: CocktailNav[] = []
    constructor() {

        super('/src/pages/cocktailBar/cocktailOrder.html')
        const cocktailWrap = document.querySelector("body")
        this.cocktailCards = [];
        
        this.query = new ctQueries();
        
        this.query.getCategories().then((result)=>{
      
            result.forEach(({id, name})=>{
                this.navItems.push(new CocktailNav(id, name, ".ctLocalNavigation", this))
            
            })

            
        })

        this.changeToCategory("Koktélok");
        
        
            
        }

    changeToCategory(category:string)
    {
        this.cocktailCards = []
        this.query?.getCocktails().then((result)=>{
            document.getElementsByClassName("cocktailWrapper")[0].innerHTML = "";
            this.navItems.forEach((n)=>{
                if(n.html?.classList.contains("selectedNav"))
                {
                    n.html.classList.remove("selectedNav")
                }
            })
            let name = this.navItems.find((n) => {
                return n.name === category
            })

            console.log(name)
            name?.html?.classList.add("selectedNav");
            result.forEach(({id,name,price,description,imageUrls,categoryId,categoryName})=>{
                
                if(categoryName === category){
                    this.cocktailCards?.push(new CocktailCardBuyer(name,price,description,categoryName,imageUrls[0],".cocktailWrapper"))
                }
            })


        })
    }



}