import { CocktailCard } from "./components/cocktailCard/cocktailCard.js";
import { CocktailNav } from "./components/cocktailNav/cocktailNav.js";
import { Page } from "../page.js";
import { ctQueries } from "./queries.js";
import { CocktailCardBuyer } from "./components/cocktailNavProMax5gSpecialEditionEXLUSIVEPreorderBonus4kCollectorsEdition/cocktailCardBuyer.js";

export class CocktailOrder extends Page {

    query: ctQueries | null = null;
    navItems: CocktailNav[] = []
    order: CocktailCardBuyer[] = []
    constructor() {

        super('/src/pages/cocktailBar/cocktailOrder.html')
        
        
        
        this.query = new ctQueries();
        
        this.query.getCategories().then((result)=>{
      
            result.forEach(({id, name})=>{
                this.navItems.push(new CocktailNav(id, name, ".ctLocalNavigation", this))
            
            })
            this.getRoomNumbers();
            
            this.addEventListenerToFinishButton();
            this.addEventListenerToCancelButton();

        })

        this.changeToCategory("Koktélok");
        
        
            
        }

    addEventListenerToCancelButton() {
        const cancelButton = document.querySelector(".ctCancel") as HTMLElement
        cancelButton.addEventListener("click", ()=>{

            this.order.forEach((c)=>{c.setNumberOf(0)})
            this.order = []
        })
    }


        changeNavItemFocus(correspondingCategory: CocktailNav)
        {
            this.navItems.forEach((n)=>{
                if(n.html?.classList.contains("selectedNav"))
                {
                    n.html.classList.remove("selectedNav")
                }
            })
            correspondingCategory.html?.classList.add("selectedNav")
        }

        async sendOrderToDatabase(){
            const roomNumber = document.getElementById("ctRoomNumber") as HTMLSelectElement
            const gid = roomNumber.options[roomNumber.selectedIndex].value as unknown as number
            let isSuccessful = true;
            await this.order.forEach(async (c)=>{
                for(let i = 0; i < c.numberOf; i++)
                {
                    await this.query?.addSale(gid, c.id).then((result)=>{
                        console.log(result)
                    })
                    .catch((error)=>{
                        console.error(error)
                        isSuccessful = false;
                    })
                }
                c.setNumberOf(0);
            })
            this.order = []
            console.log(isSuccessful)

        }

    changeToCategory(category:string)
    {
        const correspondingCategory = this.navItems.find((n)=>{ return n.name === category})
        if(!correspondingCategory)
        {
            return;
            
            
        }
        correspondingCategory.html?.classList.add("selectedNav")

        this.changeNavItemFocus(correspondingCategory)
        


        if(correspondingCategory.cards.length > 0)
        {
            document.getElementsByClassName("cocktailWrapper")[0].innerHTML = "";
            correspondingCategory.cards.forEach((c)=>{
                c.readdToPlace();
            })
            return;
        }
       

        this.query?.getCocktails().then((result)=>{
            document.getElementsByClassName("cocktailWrapper")[0].innerHTML = "";
            
            
            result.forEach(({id,name,price,description,imageUrls,categoryId,categoryName})=>{
                
                if(categoryName === category){
                    
                    let card = new CocktailCardBuyer(id, name,price,description,categoryName,imageUrls[0],".cocktailWrapper",this)
                    correspondingCategory.cards.push(card)
                    card = new CocktailCardBuyer(id, name,price,description,categoryName,imageUrls[0],".cocktailWrapper",this)
                    correspondingCategory.cards.push(card)
                    card = new CocktailCardBuyer(id, name,price,description,categoryName,imageUrls[0],".cocktailWrapper",this)
                    correspondingCategory.cards.push(card)



                }
            })
        })

        
    }

    updateOrder(card: CocktailCardBuyer)
    {
        const index = this.order.findIndex((c)=>{return c.name === card.name})
        if(index === -1)
        {
            this.order.push(card)
        }
        
        this.order = this.order.filter((c)=>{return c.numberOf > 0})


        const totalPrice = this.order.reduce((acc, c)=>{return acc + c.price * c.numberOf},0)
        const totalPriceH = document.querySelector(".ctTotalPrice") as HTMLElement
        if(totalPriceH)
        {
            totalPriceH.innerText = totalPrice.toString().slice(0,-3) + 
            (totalPrice>=1000 ? "." : "") +
            totalPrice.toString().slice(-3)  + 
            "Ft";
        }

        
    }

    getRoomNumbers(){
        this.query?.getRoomNumbers().then((result)=>{
            result.forEach(({roomNumber})=>{
                this.query?.getSale(roomNumber).then((result)=>{
                    
                    this.addToRoomNubers(roomNumber, result[0].id )
                })
                .catch((error)=>{
                    console.error(error)
                })
            })
        })
    }

    addToRoomNubers(roomNumber: number, gid: number) {
        const roomNumberH = document.getElementById("ctRoomNumber") as HTMLElement
        const option = document.createElement("option")
        option.value = gid.toString()
        option.innerText = roomNumber.toString()
        roomNumberH.appendChild(option)


    }


    addEventListenerToFinishButton() {
        
        const finishButton = document.querySelector(".ctDone") as HTMLElement
        finishButton.addEventListener("click", ()=>{
            this.sendOrderToDatabase()
        })
        
    }
    
}