import { Page } from "../page.js";

export class RestaurantAdminPage extends Page {
  constructor() {
    super("/src/pages/restaurant/restaurantAdmin.html");
    this.addEventListeners();
  }

  addModalEventListeners() {
    let closeButton = this.querySelector<HTMLElement>('.close');
    let newMealBtn = this.querySelector<HTMLElement>('#newMealBtn');




    closeButton.addEventListener('click', () => {
      this.querySelector<HTMLElement>('.content').classList.remove('hidden')
      this.querySelector<HTMLElement>('#restaurant-modal').innerHTML = '';
    });
    if (closeButton && newMealBtn) {
      let mealName = this.querySelector<HTMLInputElement>('#mealName');
      let mealCategory = this.querySelector<HTMLInputElement>('#mealCategory');
      let mealDescription = this.querySelector<HTMLInputElement>('#mealDescription');
      let mealPrice = this.querySelector<HTMLInputElement>('#mealPrice');
      let mealImage = this.querySelector<HTMLInputElement>('#mealImage')

      const inputs = ['mealName','mealCategory', 'mealDescription', 'mealPrice','mealImage'];
      inputs.forEach(element => {
          this.querySelector<HTMLElement>(`#${element}`).addEventListener('focus', (event) => {
              if (event.target) {
                  (<HTMLElement>event.target).classList.remove('border-rose-600');
              }
          })
      })

      newMealBtn.addEventListener('click', () => {
        alert('sa')
        let hasError = false;
        if (!mealName.value) {
          mealName.classList.add('border-rose-600')
          hasError = true;
        }
        if (!mealCategory.value) {
          mealCategory.classList.add('border-rose-600')
          hasError = true;
        }
        if (!mealDescription.value) {
          mealDescription.classList.add('border-rose-600')
          hasError = true;
        }
        if (!mealPrice.value) {
          mealPrice.classList.add('border-rose-600')
          hasError = true;
        }
        if (!mealImage.value) {
          mealImage.classList.add('border-rose-600')
          hasError = true;
        }
      });
    }
  }
  addEventListeners() {
    this.querySelector<HTMLElement>('#newMeal')?.addEventListener('click', () => {
      this.querySelector<HTMLElement>('.content').classList.add('hidden')
      let modalDiv = this.querySelector<HTMLElement>('#restaurant-modal');
      this.getHtml('./new-meal.html').then((html) => {
        modalDiv.innerHTML = html;
        this.addModalEventListeners();
      });
    });
    document.getElementById('newCategory')?.addEventListener('click', () => {
      alert('Sajt')
    });
    document.getElementById('deleteMeal')?.addEventListener('click', (id) => {
      alert('Sajt')
    });
    document.getElementById('modifyMeal')?.addEventListener('click', () => {
      alert('Sajt')
    });
  }
}
new RestaurantAdminPage();