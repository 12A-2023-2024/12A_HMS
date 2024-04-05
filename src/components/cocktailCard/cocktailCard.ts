export class CocktailCard{
   
    html: HTMLElement | null = null;
    name: string = "";
    abv: number = 0;
    description: string = "";
    category: string = "";
    img: string = "";

    constructor(name: string, abv: number, description: string, category: string) {
        
        this.name = name;
        this.abv = abv;
        this.description = description;
        this.category = category;
        
        const html = this.getHtml()
        const wrapperDiv = document.createElement("div")
        wrapperDiv.innerHTML = html
        this.html = wrapperDiv
            
            


        
    }
    
    getHtml() {
        return `
        <img class="ctCardImg" src="" alt="">
<div class="ctContent">
    <p class="ctName">${this.name}</p>
    <p><span class="ctABV">${this.abv}</span> <span class="CTdescription">${this.description}</span></p>
</div>`
    }
    
}