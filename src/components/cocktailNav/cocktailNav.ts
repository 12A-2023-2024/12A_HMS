export class CocktailNav{
   
    html: HTMLElement | null = null;
    name: string = "";

    constructor(name: string, place: string) {
        
        this.name = name;
        
        
        this.getHtml("src/components/cocktailNav/cocktailNav.html").then((html)=>{
            const wrapperDiv = document.createElement("div")
            wrapperDiv.innerHTML = html
            const nameH = wrapperDiv.querySelector(".ctNavItem") as HTMLElement
            console.log(nameH)
            if( nameH ){
                nameH.innerText = name;
                


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