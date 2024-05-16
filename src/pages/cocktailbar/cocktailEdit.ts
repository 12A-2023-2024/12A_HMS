import { Page } from "../page.js";
import { CocktailCard } from "./components/cocktailCard/cocktailCard.js";
import { CocktailNav } from "./components/cocktailNav/cocktailNav.js";
import { ctQueries } from "./queries.js";

export class CocktailEdit extends Page {
    
    query: ctQueries | null = null;
    cocktailCards: CocktailCard[] | null = null;
    navItems: CocktailNav[] = [];

    constructor() {
        super('/src/pages/cocktailbar/cocktailEdit.html');
        
        
        this.query = new ctQueries();
        
        this.query?.getCategories().then((result)=>{
            document.getElementsByClassName("cocktailWrapper")[0].innerHTML = "";
            
            result.forEach(({id, name})=>{
                this.navItems?.push(new CocktailNav(id, name, ".ctLocalNavigation", this));                  
            })
            console.log(this.navItems);

        })
        this.changeToCategory("Koktélok");
    }

    addEventListeners() {
        const editModal = document.querySelector('div#EditModal');        

        this.contentDiv?.querySelector('button#btnShowAddNew')?.addEventListener('click', () => {            
            editModal?.classList.remove('hidden');
            editModal?.classList.add('grid');
        });

        this.contentDiv?.querySelector('button#btnCancel')?.addEventListener('click', () => {
            editModal?.classList.remove('grid');
            editModal?.classList.add('hidden');
        });

        this.contentDiv?.querySelector('button#btnConfirm')?.addEventListener('click', () => {
            const name = this.contentDiv?.querySelector('#nameInput')?.textContent;            
            const abv = this.contentDiv?.querySelector('#abvInput')?.textContent;
            const desc = this.contentDiv?.querySelector('#descriptionInput')?.textContent;
            const category = this.contentDiv?.querySelector('#descriptionInput') as HTMLSelectElement;
            const selectedCategory = category?.options[category.selectedIndex].text;
            

        });
    }

    changeToCategory(category:string)
    {
        this.cocktailCards = []
        this.query?.getCocktails().then((result)=>{
            this.navItems?.forEach((n)=>{
                document.getElementsByClassName("cocktailWrapper")[0].innerHTML = "";

                if(n.html?.classList.contains("selectedNav"))
                {
                    n.html.classList.remove("selectedNav")
                }
            })
            let name = this.navItems?.find((n) => {
                return n.name === category
            })

            console.log(name)
            name?.html?.classList.add("selectedNav");
            result.forEach(({id,name,price,description,imageUrls,categoryId,categoryName})=>{
                
                if(categoryName === category){
                    this.cocktailCards?.push(new CocktailCard(name,price,description,categoryName,imageUrls[0],".cocktailWrapper"))
                }
            })

        })
    }
}