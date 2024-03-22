import { Page } from "../page.js";




export class RestaurantAdminPage extends Page {
  constructor() {
    super("/src/pages/restaurant/restaurantAdmin.html");
    this.addEventListeners();
  }

  loadMeals(){
    
  }
  addEventListeners(){
    document.getElementById('newMeal')?.addEventListener('click',()=>{
      alert('Sajt')
    }); 
    document.getElementById('newCategory')?.addEventListener('click',()=>{
      alert('Sajt')
    });       
    document.getElementById('deleteMeal')?.addEventListener('click',(id)=>{
      alert('Sajt')
    });
    document.getElementById('modifyMeal')?.addEventListener('click',()=>{
      alert('Sajt')
    });
  }
}
new RestaurantAdminPage();