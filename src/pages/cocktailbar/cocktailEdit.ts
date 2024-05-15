import { Page } from "../page.js";
import { CocktailCard } from "./components/cocktailCard/cocktailCard.js";
import { ctQueries } from "./queries.js";

export class CocktailEdit extends Page {
    
    query: ctQueries | null = null;
    cocktailCards: CocktailCard[] | null = null;

    constructor() {
        super('/src/pages/cocktailbar/cocktailEdit.html');
        
        this.query = new ctQueries();

        this.query?.getCocktails().then((result) => {
            document.getElementsByClassName("cocktailWrapper")[0].innerHTML = "";
            
            result.forEach(({id,name,price,description,imageUrls,categoryId,categoryName})=>{
                
                this.cocktailCards?.push(new CocktailCard(name,price,description,categoryName,imageUrls[0],".cocktailWrapper"))
            })
        });
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
}