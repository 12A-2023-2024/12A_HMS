
import { Page } from "../page.js";

export class WellnessAdminPage extends Page {

    constructor() {
        super('/src/pages/wellness/wellness_admin.html')
        this.getHtmlCallback();
    }

    override getHtmlCallback(){
        this.addButtonEventListeners();
        this.checkAdminPrivilege();
    }

    addButtonEventListeners(){
        
    }
    checkAdminPrivilege(){
        if (!localStorage.getItem("roles")?.includes("admin")) {
            var maincontainer : HTMLElement = document.querySelector("#content")!;
            maincontainer.innerHTML = '';
          }
        else{
            console.log(localStorage.getItem("roles")?.includes("admin"));
            console.log(localStorage.getItem("roles"));
            console.log("Sikeres bejelentkezés!");
        }
    }
}