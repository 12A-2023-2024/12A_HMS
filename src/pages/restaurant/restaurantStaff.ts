import { Page } from "../page.js";
import { ICategory } from "./interfaces/category.js";
import { IMeal } from "./interfaces/meal.js";


interface StoredMeal {
  mealName: string,
  mealCount: string
}



export class RestaurantStaffPage extends Page {
  categories:ICategory[]=[];
  meals:IMeal[]=[];
  currentTable: string | null = null;
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
      this.querySelector<HTMLElement>('.gridMeal').innerHTML += this.categories.map(c => {
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
              <div class="meal origin-top-right right-auto mt-2 w-full rounded-md shadow-lg bg-white ring-1 
              ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="category">
                <div class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  <div class="flex justify-between items-center">
                    <p class="text-xl font-bold mealName">${meal.name}</p>
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
    let token = 'V9I87JWH0Q3NYTVNGHMISWD67JP8STGS23A1VJP3JGY9XREBPKPCLRK9W2K4U0FQESUX5AEBKDVMAEEQSUCHEWJK21BOOTDMAXFLBDF47E485Y3HO01CBFA4';
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

      else if (target.matches('.tableDiv')) {
        this.selectTable(target);
      }
    });
  }

  insertDataToLocalStorage(index: string): void {
    let meals: Array<StoredMeal> = [];  
    const mealElements = document.querySelectorAll('.meal');
    mealElements.forEach((mealElement: Element) => {
      const mealName = (mealElement.querySelector('.mealName') as HTMLElement).innerText || 'null';
      const mealCount = (mealElement.querySelector('.mealCount') as HTMLInputElement).value || 'null';
      let currentMeal: StoredMeal = {mealName, mealCount};
      meals.push(currentMeal);
    });
    localStorage.setItem('table' + index, JSON.stringify(meals));
    console.log(localStorage.getItem('table' + index));
  }
  
  loadTableDataFromLocalStorage(index: string): void {
    let meals: Array<StoredMeal> = JSON.parse(localStorage.getItem('table' + index) || '[]');
    const mealElements = document.querySelectorAll('.meal');
  
    mealElements.forEach((mealElement: Element) => {
      const mealNameElement = mealElement.querySelector('.mealName') as HTMLElement;
      const mealCountElement = mealElement.querySelector('.mealCount') as HTMLInputElement;
  
      const mealData = meals.find(meal => meal.mealName == mealNameElement.innerText);
      if (mealData) {
        mealCountElement.value = mealData.mealCount;
      } else {
        mealCountElement.value = '0';
      }
    });
  }

  selectTable(table: HTMLElement): void {
    this.currentTable = table.innerText;
    this.loadTableDataFromLocalStorage(this.currentTable);
  
    const tables = document.querySelectorAll('.tableDiv');
    tables.forEach((element: Element) => {
      if (element != table) {
        const htmlElement = element as HTMLElement;
        htmlElement.style.backgroundColor = 'white';
      }
    });
      table.style.backgroundColor = 'grey';
  }



  addMeal(inputField: HTMLInputElement): void {
    if (this.currentTable == null) {
      alert('Please select a table first!');
      return;
    }
    else {
      let mealCount = Number(inputField.value);
      mealCount++;
      inputField.value = mealCount.toString();
      this.insertDataToLocalStorage(this.currentTable);
    }
  }

  removeMeal(inputField: HTMLInputElement): void {
    if (this.currentTable == null) {
      alert('Please select a table first!');
      return;
    }
    let mealCount = Number(inputField.value);
    if (mealCount > 0) {
        mealCount--;
    }
    inputField.value = mealCount.toString();  
    this.insertDataToLocalStorage(this.currentTable);
  }

  querySelector<T>(selector: string): T {
    return document?.querySelector(selector) as T;
}
}