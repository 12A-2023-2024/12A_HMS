import { CocktailOrder } from "../../cocktailOrder.js";
import { CartItems } from "../cartItems/cartItems.js";

export class CocktailCardBuyer{
   
    html: HTMLElement | null = null;
    name: string = "";
    price: number = 0;
    description: string = "";
    category: string = "";
    img: string = "";
    numberOf: number = 0;
    parent: CocktailOrder;
    cartItem: CartItems | null = null;
    place: string;
    id: number;

    constructor(id: number, name: string, price: number, description: string, category: string, img: string,  place: string, parent: CocktailOrder) {
        
        

        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.img = img;
        this.parent = parent;
        this.place = place;
        this.id = id;
        
        this.getHtml("src/pages/cocktailbar/components/cocktailNavProMax5gSpecialEditionEXLUSIVEPreorderBonus4kCollectorsEdition/cocktailCardBuyer.html").then((html)=>{
            this.getHtml("src/pages/cocktailbar/components/cocktailCard/cocktailCard.html").then((card)=>{
                const cardWrapperDiv = document.createElement("div")
                cardWrapperDiv.innerHTML = card
                const imgH = cardWrapperDiv.querySelector(".ctCardImg") as HTMLImageElement
                const nameH = cardWrapperDiv.querySelector(".ctName") as HTMLElement
                const descriptionH = cardWrapperDiv.querySelector(".ctDescription") as HTMLElement
                const priceH = cardWrapperDiv.querySelector(".ctABV") as HTMLElement
                
                if(imgH && nameH && descriptionH && priceH){
                    nameH.innerText = name;
                    descriptionH.innerText = description;
                    priceH.innerText = price.toString().slice(0,-3) + 
                    (price>=1000 ? "." : "") +
                    price.toString().slice(-3)  + 
                    "Ft ·";
                    imgH.src = img;


                }
                const htmlWrapperDiv = document.createElement("div")
                htmlWrapperDiv.innerHTML = html
                const cardPlace = htmlWrapperDiv.querySelector(".ctCardWrapper") as HTMLElement
                const plusButton = htmlWrapperDiv.querySelector(".ctPlus") as HTMLElement
                const minusButton = htmlWrapperDiv.querySelector(".ctMinus") as HTMLElement
                let numberH = htmlWrapperDiv.querySelector(".ctNumber") as HTMLInputElement
                const cardFinal = cardWrapperDiv.firstElementChild as HTMLElement

                if(cardPlace && plusButton && minusButton && numberH && cardFinal){
                    cardPlace.appendChild(cardFinal)
                    cardFinal.addEventListener("click", ()=>{
                        this.addToNumberOf(1)
                    })
                    plusButton.addEventListener("click", ()=>{
                        this.addToNumberOf(1)
                    })
                    minusButton.addEventListener("click", ()=>{
                        this.addToNumberOf(-1)
                    })
                    numberH.addEventListener("change", ()=>{
                        this.setNumberOf(parseInt(numberH.value))
                    }   )
                   
                }
                
                
                this.html = htmlWrapperDiv.firstElementChild as HTMLElement 
                
                const wrap = document.querySelector(place)
                

                wrap?.appendChild(this.html)
            })
        })
            
            


        
    }

    readdToPlace(){
        if(this.html){
            const wrap = document.querySelector(this.place)
            wrap?.appendChild(this.html)
        }
    }
        
    
    addToNumberOf(n: number){
        this.setNumberOf(this.numberOf + n)
    }

    setNumberOf(n: number){
        
        this.numberOf = n;
        if(this.numberOf <= 0  || isNaN(this.numberOf) ){
            this.numberOf = 0;
            this.removeCartItem()    


        }
        const numberH = this.html?.querySelector(".ctNumber") as HTMLInputElement 
        if(numberH){
            numberH.value = this.numberOf.toString();
        }
        if(this.numberOf > 0){
            if(!this.cartItem)
            {
                this.createCartItem()
            }
            this.cartItem?.setNumber(this.numberOf)
        }
        this.parent.updateOrder(this);  
    }
    
    createCartItem(){
        this.cartItem = new CartItems(this, ".ctCartItems")
        this.parent.order?.push(this)
        console.log(this.parent.order)
    }

    removeCartItem(){
        this.cartItem?.html?.remove()
        this.cartItem = null;
        this.numberOf = 0;
        this.parent.updateOrder(this)
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