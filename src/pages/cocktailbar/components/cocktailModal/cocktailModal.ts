import { Page } from "../../../page.js";
import { ctQueries } from "../../queries.js";
import { ActiveCard, DropActive } from "../activeCard.js";
import { CocktailCard } from "../cocktailCard/cocktailCard.js";

export class cocktailModal {

    modalWrapper:HTMLElement

    name:HTMLInputElement | null = null
    price:HTMLInputElement | null = null
    description:HTMLInputElement | null = null
    category:HTMLSelectElement | null = null
    img:HTMLImageElement | null = null

    file:File | null = null
    
    
    query: ctQueries | null = null;

    constructor() {

        this.modalWrapper = document.querySelector('div#modalWrapper') as HTMLElement
        
        
        this.query = new ctQueries()
        
        this.getHtml('src/pages/cocktailbar/components/cocktailModal/cocktailModal.html').then((html)=>{
            this.modalWrapper.innerHTML = html
            
            this.name = this.modalWrapper.querySelector('input#nameInput') as HTMLInputElement
            this.price = this.modalWrapper.querySelector('input#priceInput') as HTMLInputElement
            this.description = this.modalWrapper.querySelector('#descriptionInput') as HTMLInputElement
            this.category = this.modalWrapper.querySelector('#categoryInput') as HTMLSelectElement
            this.img = this.modalWrapper.querySelector('.ImgArea img') as HTMLImageElement
            
            
            if (this.name && this.price && this.description && this.category && this.img) {
                this.name.value = ActiveCard?.name ?? ""
                this.price.value = ActiveCard?.price.toString() ?? ""
                this.description.value = ActiveCard?.description ?? ""
                
                const xpath = `//option[text()="${ActiveCard?.category}"]`;
                const cardCategory = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLOptionElement                
                this.category.selectedIndex = cardCategory?.index ?? 0
                
                this.img.src = ActiveCard?.img ?? ""
                
                this.AddModalEventListeners()
                
                const imgArea = document.querySelector('.ImgArea') as HTMLElement
                const h3 = imgArea.querySelector('h3') as HTMLElement
                const p = imgArea.querySelector('p') as HTMLElement
                
                if (ActiveCard?.img) {
                    imgArea?.classList.add('_active')
                    imgArea.dataset.img = this.img.src
                    h3.classList.add('hidden')
                    p.classList.add('hidden')
                }
                else {
                    imgArea?.classList.remove('_active')
                    h3.classList.remove('hidden')
                    p.classList.remove('hidden')
                }                
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

    AddModalEventListeners() {
        const send = document.querySelector('button#btnSend')
        
        send?.addEventListener('click', () => {
            if (ActiveCard) {
                //PATCH
            }
            else {
                //POST
                if (this.file && this.category != null && this.category.selectedIndex != null) {
                    this.query?.getBase64Img(this.file).then((img) => {

                        const data = {
                            name: this.name?.value,
                            price: this.price?.value,
                            description: this.description?.value,
                            categoryId: this.category.selectedIndex + 2,
                            images: [
                                {
                                    filename: this.file?.name,
                                    file: img
                                }
                            ]
                        }
                        console.log(data.categoryId)
                        this.query?.postCocktail(data)                      
                    })
                }

            }
        })

        
        
        
        
        
        

        document.querySelector('button#btnCancel')?.addEventListener('click', () => {
            DropActive()
        })

        const selectImg = document.querySelector('#selectImg') as HTMLElement
        const imgArea = document.querySelector('.ImgArea') as HTMLElement
        const imgElement = imgArea.querySelector('img') as HTMLImageElement

        const fileInput = document.querySelector('#fileInput') as HTMLInputElement        

        selectImg?.addEventListener('click', () => {
            fileInput.click()
        })

        fileInput?.addEventListener('change', () => {
            this.file = (fileInput?.files?.[0]) ? fileInput.files[0] : null;
            const reader = new FileReader()
            reader.onload = () => {
                const imgUrl = reader.result
                imgElement.src = imgUrl?.toString() ?? ""                
                if (this.img?.src != "") {
                    imgArea?.classList.add('_active')
                }    

                imgArea.dataset.img = this.file?.name
            }
            if (this.file) {
                reader.readAsDataURL(this.file)
            }
        })
    }
}