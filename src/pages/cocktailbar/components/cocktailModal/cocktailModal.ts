import { Page } from "../../../page.js";
import { CocktailCard } from "../cocktailCard/cocktailCard.js";

export class cocktailModal {

    activeCard: CocktailCard | null = null

    constructor() {
        const modalWrapper = document.querySelector('div#modalWrapper') as HTMLElement

        this.getHtml('src/pages/cocktailbar/components/cocktailModal/cocktailModal.html').then((html)=>{
            const cocktailModal = document.createElement('div')
            cocktailModal.innerHTML = html

            const name = cocktailModal.querySelector('input#nameInput') as HTMLInputElement
            const price = cocktailModal.querySelector('input#priceInput') as HTMLInputElement
            const description = cocktailModal.querySelector('#inputdescriptionInput') as HTMLInputElement
            const category = cocktailModal.querySelector('select#categoryInput') as HTMLSelectElement
            const img = cocktailModal.querySelector('img#imgInput') as HTMLImageElement

            console.log(name)
            if (name && price && description && category && img) {
                console.log('params found')
                name.value = this.activeCard?.name ?? ""
                price.value = this.activeCard?.price.toString() ?? ""
                description.value = this.activeCard?.description ?? ""

                const xpath = '//option[text()="'+ this.activeCard?.category ?? "" +'"]'
                const cardCategory = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLOptionElement
                category.selectedIndex = cardCategory.index

                img.src = this.activeCard?.img ?? ""
            }

            modalWrapper.innerHTML = html
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