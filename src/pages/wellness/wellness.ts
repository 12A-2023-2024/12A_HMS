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
    this.getProductsData();
    this.loginformshow();
    this.carlogolistener();
  }
  addToCart(e : HTMLElement){
    var cartData : HTMLElement = document.querySelector(".cartData")!;
    if(!cartData.innerHTML.includes(e.innerText)){
      cartData.innerHTML += `
        <p class="cartElement">${e.innerText} x1</p>
      `;
    }
    else{
      var cartelements : NodeListOf<HTMLElement> = document.querySelectorAll(".cartElement")!;
      cartelements.forEach((elem)=>{
        if(elem.innerText.includes(e.innerText)){
          var asd : string[] = elem.innerText.split(" x");
          elem.innerText = `${asd[0]} x${Number(asd[1])+1}`;
        }
      });
    }
  }
  addToCartBtnListener(){
    var cartbtn : NodeListOf<HTMLElement> = document.querySelectorAll("p.cartbtn")!;
    var i : number = 0;
    cartbtn.forEach((e)=>{
        i++;
        var selector : string = `${i}element`.toString();
        e.addEventListener("click", ()=>{
          this.addToCart(document.getElementById(selector)!);
        });
    });
  }
  cartlogoclicked(){
    alert("A vásárláshoz keressen fel egy kollegánkat!");
  }

  carlogolistener(){
    document.querySelector(".cartImg")!.addEventListener("click", ()=>{
      this.cartlogoclicked();
    });
  }

  loginformshow(){
    var loginsformbtn : HTMLElement = document.querySelector(".bejelentkezesSzöveg")! ;
    loginsformbtn.addEventListener("click", ()=>{
      var loginform : HTMLElement = document.querySelector(".formforlogin")!;
      if(loginform.classList.contains("collapse")){
        loginform.className = "formforlogin visible";
      }
      else{
        loginform.className = "formforlogin collapse";
      }
    });
    
  }

  addButtonEventListeners() {
    document.getElementById("btnconfirm")?.addEventListener("click", () => {
      this.login();
    });
    this.addToCartBtnListener();
  }
  getProductsData() {
    this.fetch<WellnessProduct[]>("https://hms.jedlik.cloud/api/publicpages/wellnessproducts", "GET")
      .then((result) => {
        var maindiv = document.getElementById("maindiv") as HTMLElement;
        maindiv.innerHTML = "";
        var i: number = 0;
        result.forEach(element => {
          i++;
          if (i % 2 == 0) {
            maindiv.innerHTML += `
            <div class="w-full self-end max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p>
                <img class="p-8 rounded-t-lg" src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="product image" />
            </p>
            <div class="px-5 pb-5">
                <p>
                    <h5 id="${i}element" class=" text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${element.name}</h5>
                </p>
                <div class="flex items-center mt-2.5 mb-5 text-gray-900 dark:text-white">
                ${element.description}
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">${element.price} Ft</span>
                    <p class="cartbtn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Kosárba</p>
                </div>
            </div>
        </div>`;
          }
          else{
              maindiv.innerHTML += `
              <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <p>
                  <img class="p-8 rounded-t-lg" src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="product image" />
              </p>
              <div class="px-5 pb-5">
                  <p">
                      <h5 id="${i}element" class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${element.name}</h5>
                  </p>
                  <div class="flex items-center mt-2.5 mb-5 text-gray-900 dark:text-white">
                  ${element.description}
                  </div>
                  <div class="flex items-center justify-between">
                      <span class="text-3xl font-bold text-gray-900 dark:text-white">${element.price} Ft</span>
                      <p class="cartbtn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Kosárba</p>
                  </div>
              </div>
          </div>`;
          }
        });
        this.addButtonEventListeners();
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
    var form = document.querySelector(".formforlogin")!;
    form.className = "formforlogin collapse";
    var logintext = document.querySelector(".bejelentkezesSzöveg")!;
    console.log(logintext);
    logintext.className = "font-bold bejelentkezesSzöveg collapse";
    var innerheader = document.querySelector("#profilepicdiv")!;
    innerheader.innerHTML += `<img id="profilepic" src="" alt="Profile Picture" >`;

    if (localStorage.getItem("roles")?.includes("admin")) {
      var maincontainer : HTMLElement = document.querySelector("#AdmDiv")!;
      maincontainer.innerHTML += `<a id="AdminButton" class="hover:text-darkGrayishBlue font-bold" data-route="servicesadmin">Átlépés Admin Nézetbe</a>`;
      this.addAdminButtonListener();
    }
  }


}