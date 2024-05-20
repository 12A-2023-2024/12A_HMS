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
            const img = this.modalWrapper.querySelector('.ImgArea img') as HTMLImageElement
            

            if (name && price && description && category && img) {
                name.value = ActiveCard?.name ?? ""
                price.value = ActiveCard?.price.toString() ?? ""
                description.value = ActiveCard?.description ?? ""

                const xpath = `//option[text()="${ActiveCard?.category}"]`;
                const cardCategory = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLOptionElement
                category.selectedIndex = cardCategory?.index ?? 0

                img.src = ActiveCard?.img ?? ""
                
            }

            this.AddModalEventListeners()
            
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

    AddModalEventListeners() {
        document.querySelector('button#btnCancel')?.addEventListener('click', () => {
            DropActive()
        })

        const selectImg = document.querySelector('#selectImg') as HTMLElement
        const file = document.querySelector('#fileInput') as HTMLInputElement
        const imgArea = document.querySelector('.ImgArea') as HTMLElement
        const imgElement = imgArea.querySelector('img') as HTMLImageElement

        selectImg?.addEventListener('click', () => {
            file.click()
        })

        file.addEventListener('change', () => {    
            const img = file.files?.[0]
            const reader = new FileReader()
            reader.onload = () => {
                const imgUrl = reader.result
                imgElement.src = imgUrl?.toString() ?? ""                
                imgArea?.classList.add('_active')

                imgArea.dataset.img = img?.name
            }
            if (img) {
                reader.readAsDataURL(img)
            }
        })
    }
}