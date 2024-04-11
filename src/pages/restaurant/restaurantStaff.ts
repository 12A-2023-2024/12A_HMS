import { Page } from "../page.js";

export class RestaurantStaffPage extends Page {
  constructor() {
    super("/src/pages/restaurant/restaurantStaff.html");
    this.addEventListeners();
  }

  loadMeals(): void {      
    // copied form library
    // rewrite
        
      const userInfo = localStorage.getItem('user');   
      let token = '';
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
}