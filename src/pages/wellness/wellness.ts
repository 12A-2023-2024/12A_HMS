import { Page } from "../page.js";

export class WellnessPage extends Page {

    constructor() {
        super('/src/pages/wellness/wellness.html')
        this.getHtmlCallback();
    }

    login(){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
        "loginName": (document.getElementById("user") as HTMLInputElement).value.toString(), 
        "password": (document.getElementById("pass")as HTMLInputElement).value.toString()
        });
    
        const requestOptions : RequestInit = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
    
        fetch("https://hms.jedlik.cloud/api/login", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            localStorage.setItem("user", JSON.stringify(result));
          })
          .catch((error) => console.error(error));
          (document.getElementById("user") as HTMLInputElement).value = '';
          (document.getElementById("pass") as HTMLInputElement).value = '';
    }

    override getHtmlCallback(){
      this.addEventListeners();
    }

    addEventListeners(){
      console.log(document.getElementById("btnconfirm"));
        document.getElementById("btnconfirm")?.addEventListener("click", ()=>{
          this.login();
      });
    }
    getProductsData(){

    }


    
}