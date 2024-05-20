import { routes } from "../../routes.js";
import { ContactPage } from "../contact/contact.js";
import { Page } from "../page.js";
import { ActiveCard, DropActive } from "./components/activeCard.js";
import { CocktailCard } from "./components/cocktailCard/cocktailCard.js";
import { CocktailNav } from "./components/cocktailNav/cocktailNav.js";
import { ctQueries } from "./queries.js";

export class CocktailEdit extends Page {

    query: ctQueries | null = null;
    navItems: CocktailNav[] = [];
    cocktailCards: CocktailCard[] | null = null;
    routes: {[key: string]: {page: any}} = {}    

    constructor() {
        super('/src/pages/cocktailbar/cocktailEdit.html')
        this.query = new ctQueries()
        this.cocktailCards = []
        this.routes = routes
        
        this.query.getCategories().then((result)=>{
            
            result.forEach(({id, name})=>{
                this.navItems.push(new CocktailNav(id, name, ".ctLocalNavigation", this))
            })
        })

        this.AddEvetListeners()
        this.query?.composePayload()
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

            name?.html?.classList.add("selectedNav");
            result.forEach(({id,name,price,description,imageUrls,categoryId,categoryName})=>{
                
                if(categoryName === category){
                    this.cocktailCards?.push(new CocktailCard(name,price,description,categoryName,imageUrls[0],".cocktailWrapper", routes))
                }
            })
        })

    }

    AddEvetListeners() {        
        const del = document.querySelector('button#btnDel')

        this.contentDiv?.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;                        
                if (target && target.id === 'btnAddNew') {
                    const route = target.getAttribute('data-route')  
                    if ( route != null) {
                        if (this.routes[route] && this.routes[route].page) {
                            DropActive()
                            new this.routes[route].page()
                        }
                    }
                }
                if (target && target.id === 'btnDel') {
                    if (ActiveCard != null) {
                        this.query?.getCocktails().then((drinks) => {
                            drinks.forEach(drink => {
                                if (drink.name == ActiveCard?.name
                                    && drink.price == ActiveCard.price
                                    && drink.description == ActiveCard.description
                                    && drink.categoryName == ActiveCard.category) {

                                        this.query?.deleteCocktail(drink.id)
                                }
                            });
                        })
                    }
                    else {
                        alert('No drink was selected!')
                    }
                }
        })
    }
}