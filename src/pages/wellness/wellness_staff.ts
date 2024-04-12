
import { Page } from "../page.js";

export class WellnessStaffPage extends Page {

    constructor() {
        super('/src/pages/wellness/wellness_staff.html')
    }

    login(){
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
      "loginName": document.getElementById("user")?.innerText, 
      "password": document.getElementById("pass")?.innerText
      });
  
      const requestOptions : RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      fetch("https://hms.jedlik.cloud/api/login", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
  }

    addEventListeners(){

    }
    getProductsData(){

    }


    
}
