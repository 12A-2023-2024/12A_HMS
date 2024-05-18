import { Page } from "../page.js";
import { UserData } from "./user.js";
import { WellnessProduct } from "./wellnessproduct.js";

export class WellnessPage extends Page {

  constructor() {
    super('/src/pages/wellness/wellness.html')
    this.getHtmlCallback();
  }

  login() {
    var sucLogin : boolean = false;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      "loginName": (document.getElementById("user") as HTMLInputElement).value.toString(),
      "password": (document.getElementById("pass") as HTMLInputElement).value.toString()
    });

     this.fetch<UserData>("https://hms.jedlik.cloud/api/login", "POST", body)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result));
        localStorage.setItem("roles", JSON.stringify(result.roles));
        sucLogin = true;
        this.LoginVisual();
      })
      .catch((error) => {
        console.error(error);
        sucLogin = false;
      });
        (document.getElementById("pass") as HTMLInputElement).value = '';
        (document.getElementById("user") as HTMLInputElement).value = ''; 

        
      

    }

  override getHtmlCallback() {
    this.addButtonEventListeners();
    this.getProductsData();
  }

  addButtonEventListeners() {
    document.getElementById("btnconfirm")?.addEventListener("click", () => {
      this.login();
    });
  }
  getProductsData() {

    this.fetch<WellnessProduct[]>("https://hms.jedlik.cloud/api/publicpages/wellnessproducts", "GET")
      .then((result) => {
        var maindiv = document.getElementById("maindiv") as HTMLElement;
        // var contentCollection : HTMLCollection = maindiv.children;
        maindiv.innerHTML = "";
        var i: number = 0;
        result.forEach(element => {
          i++;
          if (i % 2 == 0) {
            maindiv.innerHTML += `
              <div class="bg-blue-100 w-2/5 h-1/6 flex flex-col items-end justify-between self-end rounded-md m-5">
                <h1 class="text-lg font-bold self-center" >
                  ${element.name}
                </h1>
                <p class="text-base font-semibold self-start m-2">
                  ${element.description}
                </p>
                <p>
                  ${element.price} Ft
                </p>
                <div class="rounded-md border border-transparent bg-blue-900 w-28 text-center float-right m-2  ">
                  <p class="m-1 cartbtn"> Kosárba</p>
                </div>
              </div>`;
          }
          else{
              maindiv.innerHTML += `
                <div class="bg-blue-100 w-2/5 h-1/6 flex flex-col items-end justify-between rounded-md m-5">
                  <h1 class="text-lg font-bold self-center" >
                  ${element.name}
                  </h1>
                  <p class="text-base font-semibold self-start m-2">
                    ${element.description}
                  </p>
                  <p>
                  ${element.price} Ft
                  </p>
                  <div class="rounded-md border border-transparent bg-blue-900 w-28 text-center float-right m-2  ">
                    <p class="m-1 cartbtn"> Kosárba</p>
                  </div>
                </div>`;
          }
        });




      })
      .catch((error) => console.error(error));


  }
  addAdminButtonListener(){
    var adminbutton : HTMLElement = document.getElementById("AdminButton")!; 
    adminbutton.addEventListener("click", ()=>{
      var url : string[] = window.location.href.split("?");
      window.history.replaceState(null, "", `${url[0]}?page=servicesadmin`);
      location.reload();
    });
  }
  LoginVisual() {
    var form = document.getElementById("form") as HTMLElement;
    form.innerHTML = "";
    var innerheader = document.querySelector("#profilepicdiv") as HTMLElement;
    innerheader.innerHTML += `<img id="profilepic" src="" alt="Profile Picture" >`;

    if (localStorage.getItem("roles")?.includes("admin")) {
      var maincontainer : HTMLElement = document.querySelector("#AdmDiv")!;
      maincontainer.innerHTML += `<a id="AdminButton" class="hover:text-darkGrayishBlue font-bold" data-route="servicesadmin">Átlépés Admin Nézetbe</a>`;
      this.addAdminButtonListener();
    }
  }


}