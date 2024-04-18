import { Page } from "../page.js";
import { ICategory } from "./interfaces/category.js";
import { IMeal } from "./interfaces/meal.js";

export class RestaurantStaffPage extends Page {
  categories:ICategory[]=[];
  meals:IMeal[]=[];
  constructor() {
    super("/src/pages/restaurant/restaurantStaff.html");
    this.loadCategories();
    this.loadMeals();
    this.addEventListeners();
  }

  loadCategories(): void {
    this.fetch<ICategory[]>('https://hms.jedlik.cloud/api/restaurant/categories','GET')
    .then((arr:ICategory[])=>{
      this.categories= arr;
      this.querySelector<HTMLElement>('.grid').innerHTML += this.categories.map(c => {
        return `<div class="category relative block text-left justify-center" data-category-name="${c.name}">
          <div class="inline-flex justify-center w-full rounded-md border border-gray-300 
          shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
          focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 text-xl">
          ${c.name}
          </div>
        </div>`;
      }).join('');
    });
  }  

  loadMeals(): void {
    this.fetch<IMeal[]>('https://hms.jedlik.cloud/api/restaurant/menuitems','GET')
    .then((arr:IMeal[])=>{
      this.meals = arr;
  
      const categories = document.querySelectorAll('.category');
      categories.forEach(c => {
        const categoryName = c.getAttribute('data-category-name');
        this.meals.forEach(meal => {
          if (meal.categoryName == categoryName) {
            c.innerHTML += `
              <div class="origin-top-right right-auto mt-2 w-full rounded-md shadow-lg bg-white ring-1 
              ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="category">
                <div class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  <div class="flex justify-between items-center">
                    <p class="text-xl font-bold">${meal.name}</p>
                    <div class="flex items-center">
                      <button class="decrementButton border-2 border-black w-8 h-8 bg-slate-200 font-bold
                      text-xl text-center m-1">
                      -</button> 
                      <input type="text" disabled value="0" 
                      class="mealCount box-border w-8 h-8 border-2 border-black text-center m-1">
                      <button class="incrementButton border-2 border-black w-8 h-8 bg-slate-200 font-bold
                      text-xl text-center m-1">
                      +</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
          }
        });
      });
    });
  }

  fetch<T>(url: string, method: string, body: any = null): Promise<T> {
    const userInfo = localStorage.getItem('user');   
    let token = 'FLCSPJG8VKOQE7JCRDCZO3NL9HVO541C30MNA2IR71S076FDTPLPJR9UZC05F4EB9ISSQV2N6SHTFH2GYC5E90ZT8NS8DW5HUSBMODEIDJ51RLV77U85HT36';
    if (userInfo) {
        token = JSON.parse(userInfo).token;
    }
    const requestOptions: RequestInit = {
        method: method,
        redirect: 'follow',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: body ? JSON.stringify(body) : null
    };

    return fetch(url, requestOptions)
        .then( (response) => {
            if (response.status == 200) {
                return response.text();
            } else if (response.status == 500) {                    
                throw response;
            } else {
                throw new Error(`Hiba a back-end hívás során (ErrorCode: ${response.status})`)
            }
        })
        .then( (data) => {
            if (data) {
                return JSON.parse(data) as T
            }
            return null as T;
        })            
}

  displayError(error: any, selector: string): void {
      if (error instanceof Response) {
          error.json().then( (msg) => {
              this.querySelector<HTMLElement>(selector).innerText = msg.message;
          })
      }
      else {
          this.querySelector<HTMLElement>(selector).innerText = error;
      }
  }

  addEventListeners(): void {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.matches('.decrementButton')) {
        const inputField = target.parentElement?.querySelector('input') as HTMLInputElement;
        this.removeMeal(inputField);
      } else if (target.matches('.incrementButton')) {
        const inputField = target.parentElement?.querySelector('input') as HTMLInputElement;
        this.addMeal(inputField);
      }
    });
  }

  addMeal(inputField: HTMLInputElement): void {
    let mealCount = Number(inputField.value);
    mealCount++;
    inputField.value = mealCount.toString();
  }

  removeMeal(inputField: HTMLInputElement): void {
    let mealCount = Number(inputField.value);
    if (mealCount > 0) {
        mealCount--;
    }
    inputField.value = mealCount.toString();  
  }

  querySelector<T>(selector: string): T {
    return document?.querySelector(selector) as T;
}
}