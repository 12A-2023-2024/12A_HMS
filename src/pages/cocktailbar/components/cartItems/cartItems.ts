import { CocktailOrder } from "../../cocktailOrder";
import { CocktailCardBuyer } from "../cocktailNavProMax5gSpecialEditionEXLUSIVEPreorderBonus4kCollectorsEdition/cocktailCardBuyer";

export class CartItems{
   
    html: HTMLElement | null = null;

    connectedCard: CocktailCardBuyer;

    constructor(connectedCard:CocktailCardBuyer, place: string) {
        
      
        this.connectedCard = connectedCard

        
        this.getHtml("src/pages/cocktailbar/components/cartItems/cartItems.html").then((html)=>{
            const wrapperDiv = document.createElement("div")
            wrapperDiv.innerHTML = html
            
            this.html = wrapperDiv.firstElementChild as HTMLElement
            const wrap = document.querySelector(place)
            
            const nameH = this.html?.querySelector(".ctName") as HTMLElement

            nameH.innerText = connectedCard.name
            
            const plusButton = this.html?.querySelector(".ctPlus") as HTMLElement
            const minusButton = this.html?.querySelector(".ctMinus") as HTMLElement
            const xButton = this.html?.querySelector(".ctXButton") as HTMLElement

            plusButton.addEventListener("click", ()=>{
                this.connectedCard.addToNumberOf(1)
            })
            minusButton.addEventListener("click", ()=>{
                this.connectedCard.addToNumberOf(-1)
            })
            xButton.addEventListener("click", ()=>{
                this.connectedCard.setNumberOf(0)
            })
            
            
            wrap?.appendChild(this.html)
            
            this.setNumber(this.connectedCard.numberOf)
        })
        
            
            


        
    }

    readdToPlace(){
        if(this.html){
            const wrap = document.querySelector(this.connectedCard.place)
            wrap?.appendChild(this.html)
        }
    }

    setNumber(number: number){
        const numberH = this.html?.querySelector(".ctAmount") as HTMLElement
        const priceH = this.html?.querySelector(".ctPrice") as HTMLElement
        if(numberH && priceH){
            numberH.innerText = number.toString()
            priceH.innerText = (this.connectedCard.price * number).toString().slice(0,-3) + 
            (this.connectedCard.price * number >= 1000 ? "." : "") +
            (this.connectedCard.price * number).toString().slice(-3) +
            "Ft"
        }
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