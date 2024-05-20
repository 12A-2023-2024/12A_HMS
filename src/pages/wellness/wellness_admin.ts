
import { Page } from "../page.js";
import { WellnessProduct } from "./wellnessproduct.js";

export class WellnessAdminPage extends Page {

    constructor() {
        super('/src/pages/wellness/wellness_admin.html')
        this.getHtmlCallback();
    }

    override async getHtmlCallback(){
        this.checkAdminPrivilege();
        this.addMainDivIfNotExistent();
        await this.getProductsData();
        this.carlogolistener();
        this.newWellnessProductButtonListener();
        this.deleteproductbuttonlistener();
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
    async getProductsData() {

        await this.fetch<WellnessProduct[]>("https://hms.jedlik.cloud/api/publicpages/wellnessproducts", "GET")
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
                          <p class="m-1 deletebtn" data-index="${element.id}"> Törlés</p>
                        </div>
                        <div class="rounded-md border border-transparent bg-green-900 w-28 text-center float-right m-2  ">
                          <p class="m-1 modifybtn" data-index="${element.id}"> Módósítás</p>
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
                          <p class="m-1 deletebtn" data-index="${element.id}"> Törlés</p>
                        </div>
                        <div class="rounded-md border border-transparent bg-green-900 w-28 text-center float-right m-2  ">
                          <p class="m-1 modifybtn" data-index="${element.id}"> Módósítás</p>
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
    deleteproductbuttonlistener(){
      var asd : NodeListOf<HTMLElement> = document.querySelectorAll(".deletebtn")!;
      console.log(asd);
      var i : number = 0;
      var asdi : number = 0;
      asd.forEach((element) => {
        i = Number(asd[asdi].dataset.index)
        asdi++;
        element.classList.add(`${i}del`);
        element.addEventListener("click", ()=>{
          this.deletewellnessproduct(i);
        });
      });
    }
    deletewellnessproduct(index : number){
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = null;
        this.fetch<null>(`https://hms.jedlik.cloud/api/wellness/products/${index}`, "DELETE", body)
      .then((result) => {
        alert("A termék sikeresen törölve a listából!");
      })
      .catch((error) => {
        console.error(error);
      });
    }
    newWellnessProductButtonListener(){
      document.getElementById("addWellnessProduct")?.addEventListener("click", (e)=>{
        this.addNewWellnessPorduct();
      });
    }
    addNewWellnessPorduct(){
      var name : string = (document.getElementById("name") as HTMLInputElement).value.toString();
      var cost : string = (document.getElementById("cost") as HTMLInputElement).value.toString();
      var desc : string = (document.getElementById("desc") as HTMLInputElement).value.toString();
      var cat : string = (document.getElementById("cat") as HTMLInputElement).value.toString();
      if(!name || !cost || !desc || !cat){
        alert("Kérem adjon meg minden adatot!");
      }
      else{
        const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = JSON.stringify({
        "name": name,
        "price": cost,
        "description": desc,
        "categoryId": cat 
      });
        this.fetch<null>("https://hms.jedlik.cloud/api/wellness/products", "POST", body)
      .then((result) => {
        alert("A termék sikeresen hozzáadva a listához!");
      })
      .catch((error) => {
        console.error(error);
      });
      }
    }
    makeanorder(e : string, roomnumber : number){
      var usedstring : string[] = e.split(" x");
      for (let index = 0; index < Number(usedstring[1]); index++) {
        const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = JSON.stringify({
          "RoomNumber": roomnumber
        });
  
       this.fetch<null>("https://hms.jedlik.cloud/api/wellness/sale", "POST", body)
        .then((result) => {

        })
        .catch((error) => {
          console.error(error);
        });
      }
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
      var roomnumber : number = Number((document.getElementById("roomnumber") as HTMLInputElement).value);
      if(roomnumber == 0){
        return;
      }
      else{
        var asd : NodeListOf<HTMLElement> = document.querySelectorAll(".cartElement")!;
        var listofnames : string[] = [];
        asd.forEach((e)=>{
          e.className = "cartElement hidden";
          listofnames.push(e.innerText);
        });
        
        listofnames.forEach((e)=>{
          this.makeanorder(e, roomnumber);
        });
  
        var cartdata : HTMLElement = document.querySelector(".cartData")!;
        cartdata.innerHTML = "";
        (document.getElementById("roomnumber") as HTMLInputElement).value = "";
      }
    }
    carlogolistener(){
      document.querySelector(".cartImg")!.addEventListener("click", ()=>{
        this.cartlogoclicked();
      });
    }



}