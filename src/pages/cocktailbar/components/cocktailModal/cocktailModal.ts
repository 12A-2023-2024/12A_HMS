import { Page } from "../../../page.js";
import { ctQueries } from "../../queries.js";
import { ActiveCard } from "../activeCard.js";
import { CocktailCard } from "../cocktailCard/cocktailCard.js";

export class cocktailModal {

    constructor() {

        const modalWrapper = document.querySelector('div#modalWrapper') as HTMLElement

        this.getHtml('src/pages/cocktailbar/components/cocktailModal/cocktailModal.html').then((html)=>{
            modalWrapper.innerHTML = html

            const name = modalWrapper.querySelector('input#nameInput') as HTMLInputElement
            const price = modalWrapper.querySelector('input#priceInput') as HTMLInputElement
            const description = modalWrapper.querySelector('#descriptionInput') as HTMLInputElement
            const category = modalWrapper.querySelector('select#categoryInput') as HTMLSelectElement
            const img = modalWrapper.querySelector('img#imgInput') as HTMLImageElement

            if (name && price && description && category && img) {
                name.value = ActiveCard?.name ?? ""
                price.value = ActiveCard?.price.toString() ?? ""
                description.value = ActiveCard?.description ?? ""

                const xpath = `//option[text()="${ActiveCard?.category}"]`;
                const cardCategory = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLOptionElement
                category.selectedIndex = cardCategory.index                

                img.src = ActiveCard?.img ?? ""
            }

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