
import { Page } from "../page.js";

export class WellnessAdminPage extends Page {

    constructor() {
        super('/src/pages/wellness/wellness_admin.html')
        this.getHtmlCallback();
    }

    override getHtmlCallback(){
        this.addButtonEventListeners();
    }
    AddToCart(){
        console.log("asd");
    }

    addButtonEventListeners(){
        var cartbtn = document.querySelectorAll(".cartbtn");
        console.log(cartbtn);
        console.log(typeof(cartbtn));
        cartbtn.forEach(element => {
            element.addEventListener("click", ()=>{
                this.AddToCart();
            });
        });
    }
}