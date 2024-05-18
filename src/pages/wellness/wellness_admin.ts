
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
        this.addButtonEventListeners();
    }

    addButtonEventListeners(){
        
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




}