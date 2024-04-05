import { Page } from "../page.js";

export class RestaurantStaffPage extends Page {
  constructor() {
    super("/src/pages/restaurant/restaurantStaff.html");
    this.addEventListeners();
  }

  addEventListeners(): void {
    const decrementButtons = document.querySelectorAll('.decrementButton');
    const incrementButtons = document.querySelectorAll('.incrementButton');

    decrementButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const inputField = (event.target as Element).nextElementSibling as HTMLInputElement;
        this.removeMeal(inputField);
      });
    });

    incrementButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const inputField = (event.target as Element).previousElementSibling as HTMLInputElement;
        this.addMeal(inputField);
      });
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