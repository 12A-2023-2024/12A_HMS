export class CocktailCard{
   
    html: HTMLElement | null = null;
    name: string = "";
    abv: number = 0;
    description: string = "";
    category: string = "";
    img: string = "";

    constructor(name: string, abv: number, description: string, category: string, img: string,  place: string) {
        
        this.name = name;
        this.abv = abv;
        this.description = description;
        this.category = category;
        this.img = img;
        
        this.getHtml("src/components/cocktailCard/cocktailCard.html").then((html)=>{
            const wrapperDiv = document.createElement("div")
            wrapperDiv.classList.add("shadow-secondary-5")
            wrapperDiv.innerHTML = html
            const imgH = wrapperDiv.querySelector(".ctCardImg") as HTMLImageElement
            const nameH = wrapperDiv.querySelector(".ctName") as HTMLElement
            const descriptionH = wrapperDiv.querySelector(".ctDescription") as HTMLElement
            const abvH = wrapperDiv.querySelector(".ctABV") as HTMLElement
            console.log(descriptionH)
            if(imgH && nameH && descriptionH && abvH){
                nameH.innerText = name;
                descriptionH.innerText = description;
                abvH.innerText = abv.toString() + " ·";
                imgH.src = img;


            }
            this.html = wrapperDiv.firstElementChild as HTMLElement
            const wrap = document.querySelector(place)
            

            wrap?.appendChild(this.html)
        })
        
            
            


        
    }
    
    // getHtml() {
    //     return `
    //     <div class="ctCard">
    //     <img class="ctCardImg" src="https://fastly.picsum.photos/id/988/200/300.jpg?hmac=t-oW7bwXaruDMMMz6vIk1GO5lfOolflGxHfJfheVvc8" alt="">
    //     <div class="ctContent">
    //         <p class="ctName text-base text-center">${this.name}</p>
    //         <p class="text-xs ctDescription"><span class="ctABV font-bold">${this.abv}·</span> <span class="CTdescription">${this.description}</span></p>
    //     </div>
    //     <div class="ctBackgroundBox"></div>
    // </div>`
    // }
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