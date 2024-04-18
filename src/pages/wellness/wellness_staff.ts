
import { Page } from "../page.js";

export class WellnessStaffPage extends Page {

  constructor() {
    super('/src/pages/wellness/wellness_staff.html')
    this.getHtmlCallback();
}

login(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
    "loginName": document.getElementById("user")?.innerText.toString(), 
    "password": document.getElementById("pass")?.innerText.toString()
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

override getHtmlCallback(){
  this.addEventListeners();
}

addEventListeners(){
  document.getElementById("btnconfirm")?.addEventListener("click", ()=>{
      this.login();
  });
  console.log("asd");
}
getProductsData(){

}

    
}
