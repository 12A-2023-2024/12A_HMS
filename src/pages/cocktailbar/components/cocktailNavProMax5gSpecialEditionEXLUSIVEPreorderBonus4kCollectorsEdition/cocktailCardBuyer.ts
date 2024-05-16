export class CocktailCardBuyer{
   
    html: HTMLElement | null = null;
    name: string = "";
    price: number = 0;
    description: string = "";
    category: string = "";
    img: string = "";

    constructor(name: string, price: number, description: string, category: string, img: string,  place: string) {
        
        

        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.img = img;
        
        this.getHtml("src/pages/cocktailbar/components/cocktailNavProMax5gSpecialEdition/cocktailCard.html").then((html)=>{
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

                this.html = cardWrapperDiv.firstElementChild as HTMLElement
                const wrap = document.querySelector(place)
                

                wrap?.appendChild(this.html)
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