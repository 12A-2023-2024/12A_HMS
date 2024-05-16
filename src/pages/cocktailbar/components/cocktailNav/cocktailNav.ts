import { CocktailBar } from "../../cocktailBar";
import { CocktailEdit } from "../../cocktailEdit";
import { CocktailOrder } from "../../cocktailOrder";

export class CocktailNav{
   
    html: HTMLElement | null = null;
    name: string = "";
    parent: CocktailBar | CocktailEdit | CocktailOrder | null = null;

    constructor(id: number, name: string, place: string, parent: CocktailOrder | CocktailBar | CocktailEdit) {
        
        this.name = name;
        this.parent = parent
        
        this.getHtml("src/pages/cocktailbar/components/cocktailNav/cocktailNav.html").then((html)=>{
            const wrapperDiv = document.createElement("div")
            wrapperDiv.innerHTML = html
            const nameH = wrapperDiv.querySelector(".ctNavItem") as HTMLElement
           
            if( nameH ){
                nameH.innerText = name;
                nameH.onclick = ()=>{parent.changeToCategory(this.name)}


            }
            this.html = wrapperDiv.firstElementChild as HTMLElement
            const wrap = document.querySelector(place)
            
            wrap?.appendChild(this.html)
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