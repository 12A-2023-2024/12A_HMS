import { Page } from "../../../page.js";
import { ctQueries } from "../../queries.js";
import { ActiveCard, DropActive } from "../activeCard.js";
import { CocktailCard } from "../cocktailCard/cocktailCard.js";

export class cocktailModal {

    modalWrapper:HTMLElement

    constructor() {

        this.modalWrapper = document.querySelector('div#modalWrapper') as HTMLElement

        this.getHtml('src/pages/cocktailbar/components/cocktailModal/cocktailModal.html').then((html)=>{
            this.modalWrapper.innerHTML = html

            const name = this.modalWrapper.querySelector('input#nameInput') as HTMLInputElement
            const price = this.modalWrapper.querySelector('input#priceInput') as HTMLInputElement
            const description = this.modalWrapper.querySelector('#descriptionInput') as HTMLInputElement
            const category = this.modalWrapper.querySelector('select#categoryInput') as HTMLSelectElement
            const img = this.modalWrapper.querySelector('img#imgInput') as HTMLImageElement

            if (name && price && description && category && img) {
                name.value = ActiveCard?.name ?? ""
                price.value = ActiveCard?.price.toString() ?? ""
                description.value = ActiveCard?.description ?? ""

                const xpath = `//option[text()="${ActiveCard?.category}"]`;
                const cardCategory = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLOptionElement
                category.selectedIndex = cardCategory?.index ?? 0

                img.src = ActiveCard?.img ?? ""
                
            }

            document.querySelector('button#btnCancel')?.addEventListener('click', () => {
                DropActive()
            })
            
        })
        
        
    }
    
    getHtml(url: string): Promise<string> {
        const requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };
        
        return fetch(url, requestOptions)
        .then( (response) => {
            return response.text()
        })
        .catch( (error) => {
            throw new Error(error);
        })
    }
}