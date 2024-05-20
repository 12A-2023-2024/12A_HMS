
import { Page } from "../page.js";
import { WellnessProduct } from "./wellnessproduct.js";

export class WellnessAdminPage extends Page {

    constructor() {
        super('/src/pages/wellness/wellness_admin.html')
        this.getHtmlCallback();
    }

    override getHtmlCallback(){
        this.checkAdminPrivilege();
        this.addMainDivIfNotExistent();
        this.getProductsData();
        this.carlogolistener();
    }

    addButtonEventListeners(){
      this.addToCartBtnListener();

    }
    checkAdminPrivilege(){
        if (!localStorage.getItem("roles")?.includes("admin")) {
            var maincontainer : HTMLElement = document.querySelector("#content")!;
            maincontainer.innerHTML = '';
            console.log("Skiertelen bejelentkezés.");
          }
        else{
            console.log("Sikeres bejelentkezés!");
        }
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
                  <div class="bg-blue-100 w-2/5 h-1/6 flex flex-col items-end justify-between self-end rounded-md m-5">
                    <h1 id="${i}element" class="text-lg font-bold self-center" >
                      ${element.name}
                    </h1>
                    <p class="text-base font-semibold self-start m-2">
                      ${element.description}
                    </p>
                    <p>
                      ${element.price} Ft
                    </p>
                    <div>
                        <div class="rounded-md border border-transparent bg-red-900 w-28 text-center float-right m-2  ">
                          <p class="m-1 deletebtn"> Törlés</p>
                        </div>
                        <div class="rounded-md border border-transparent bg-green-900 w-28 text-center float-right m-2  ">
                          <p class="m-1 modifybtn"> Módósítás</p>
                        </div>
                        <div class="rounded-md border border-transparent bg-blue-900 w-28 text-center float-right m-2  ">
                            <p class="m-1 cartbtn"> Igénybevétel</p>
                        </div>
                      </div>
                    </div>`;
              }
              else{
                  maindiv.innerHTML += `
                    <div class="bg-blue-100 w-2/5 h-1/6 flex flex-col items-end justify-between rounded-md m-5">
                      <h1 id="${i}element" class="text-lg font-bold self-center" >
                      ${element.name}
                      </h1>
                      <p class="text-base font-semibold self-start m-2">
                        ${element.description}
                      </p>
                      <p>
                      ${element.price} Ft
                      </p>
                      <div>
                        <div class="rounded-md border border-transparent bg-red-900 w-28 text-center float-right m-2  ">
                          <p class="m-1 deletebtn"> Törlés</p>
                        </div>
                        <div class="rounded-md border border-transparent bg-green-900 w-28 text-center float-right m-2  ">
                          <p class="m-1 modifybtn"> Módósítás</p>
                        </div>
                        <div class="rounded-md border border-transparent bg-blue-900 w-28 text-center float-right m-2  ">
                            <p class="m-1 cartbtn"> Igénybevétel</p>
                        </div>
                      </div>
                    </div>`;
              }
            });
            this.addButtonEventListeners();
          })
          .catch((error) => console.error(error));
    
    
      }
    addMainDivIfNotExistent(){
        var div : HTMLElement = document.querySelector(".maincontainer")!;
        var subdiv : HTMLElement | null = document.querySelector("#maindiv");
        if(subdiv == null){
            div.innerHTML += `
            <div id="maindiv" class="flex h-full  flex-col">    
                <div>
                </div>
            </div>
            `;
        }
    }
    modifywellnessproduct(){

    }
    deletewellnessproduct(){

    }
    makeanorder(e : string, roomnumber : number){

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
      var asd : NodeListOf<HTMLElement> = document.querySelectorAll(".cartElement")!;
      var listofnames : string[] = [];
      asd.forEach((e)=>{
        e.className = "cartElement hidden";
        listofnames.push(e.innerText);
      });
      var roomnumber : number = 0;
      listofnames.forEach((e)=>{
        this.makeanorder(e, roomnumber);
      });

      var cartdata : HTMLElement = document.querySelector(".cartData")!;
      cartdata.innerHTML = "";
    }
    carlogolistener(){
      document.querySelector(".cartImg")!.addEventListener("click", ()=>{
        this.cartlogoclicked();
      });
    }



}