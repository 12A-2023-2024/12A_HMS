import { Page } from "../page.js";
import { ICategory } from "./interfaces/category.js";

export class RestaurantAdminPage extends Page {
  categories:ICategory[]=[];
  constructor() {
    super("/src/pages/restaurant/restaurantAdmin.html");
    localStorage.setItem('user',`{
      "name": "administrator",
      "token": "ULTXTNU045FTTK6NLY8ORLS89TTDHL0QFWB8O09HA6EY15XXMFSPS6LUASWAB0LJO1CD5SMUK1B16B1EBPKSJ0KJAN6Y3JT6KANO1MX8TU4H9O7GICNGAQQ7",
      "roles": [
          "admin"
      ],
      "validTo": "2024-04-11T07:08:48.0728442+00:00"
    }`)
    this.addEventListeners();
  }

  // openAndAddModalEventListeners(selector:string,path:string,callback:void){
  //   this.querySelector<HTMLElement>(selector).addEventListener('click', () => {
  //     this.querySelector<HTMLElement>('.content').classList.add('hidden');
  //     let modalDiv = this.querySelector<HTMLElement>('#restaurant-modal');
  //     this.getHtml(path).then((html) => {
  //       modalDiv.innerHTML = html;
  //       callback;
  //     });
  //   });
  // }
  loadCategories(errorDivSelector:string,errorMessageSelector:string){
    this.fetch<ICategory[]>('https://hms.jedlik.cloud/api/restaurant/categories','GET')
    .then((arr:ICategory[])=>{
      this.categories= arr;
    })
    .catch((error:Error)=>{
      this.querySelector<HTMLElement>(errorDivSelector).classList.remove('hidden');
      this.querySelector<HTMLElement>(errorMessageSelector).innerText=error.message;

    })
  }

  closeModal(): void {
    this.querySelector<HTMLElement>('.content').classList.remove('hidden')
    this.querySelector<HTMLElement>('#restaurant-modal').innerHTML = '';
  }

  addNewMealModalEventListeners(): void {
    let newMealBtn = this.querySelector<HTMLElement>('#newMealBtn');

    let mealName = this.querySelector<HTMLInputElement>('#mealName');
    let mealCategory = this.querySelector<HTMLInputElement>('#mealCategory');
    let mealDescription = this.querySelector<HTMLInputElement>('#mealDescription');
    let mealPrice = this.querySelector<HTMLInputElement>('#mealPrice');
    let mealImage = this.querySelector<HTMLInputElement>('#mealImage')

    const inputs = ['mealName', 'mealCategory', 'mealDescription', 'mealPrice', 'mealImage'];
    inputs.forEach(element => {
      this.querySelector<HTMLElement>(`#${element}`).addEventListener('focus', (event) => {
        if (event.target) {
          (<HTMLElement>event.target).classList.remove('border-rose-600');
        }
      })
    })


    this.querySelector<HTMLElement>('#closeBtn').addEventListener('click', () => {
      this.closeModal();
    })


    newMealBtn.addEventListener('click', () => {
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
    //To do

  }

  addModifyCategoryModalEventListeners(): void {
    let categorySelect = this.querySelector<any>('#categorySelect');
    let categoryInput = this.querySelector<HTMLInputElement>('#categoryInput');
    let saveBtn = this.querySelector<HTMLInputElement>('#saveBtn');
    let previousText = '';

    this.loadCategories('.error-box','#errorMessage');


    this.categories.forEach(category => {
      categorySelect.appendChild(new Option(category.name,category.id.toString()));
    });

    this.querySelector<HTMLElement>('#closeBtn').addEventListener('click', () => {
      this.closeModal();
    })


    categorySelect.addEventListener('change', () => {
      categoryInput.value = categorySelect.options[categorySelect.selectedIndex].text;
      previousText = categorySelect.options[categorySelect.selectedIndex].text;
    })


    categoryInput.addEventListener('change', () => {
      if (previousText != categoryInput.value && categoryInput.value != '') {
        saveBtn.disabled = false;
        saveBtn.classList.add('bg-green-500');
        saveBtn.classList.add('hover:bg-green-700');
        saveBtn.classList.remove('bg-green-300');

      } else {
        saveBtn.disabled = true;
        saveBtn.classList.add('bg-green-300');
        saveBtn.classList.remove('bg-green-500');
        saveBtn.classList.remove('hover:bg-green-700');
      }
    })


    saveBtn.addEventListener('click', () => {
      let body = `
      {
        "id": ${categorySelect.options[categorySelect.selectedIndex].value},
        "name": "${categoryInput.value}"
      }
      `
      this.fetch('https://hms.jedlik.cloud/api/restaurant/categories','PUT',body)
        .catch((error:Error)=>{
          this.querySelector<HTMLElement>('#errorMessage').innerText=error.message;
        })
      this.closeModal();
    })
    this.querySelector<HTMLElement>('#closeErrorDiv').addEventListener('click',()=>{
      this.querySelector<HTMLElement>('.error-box').classList.add('hidden');
    })
  }

  addDeleteCategoryModalEventListeners(): void {
    let categorySelect = this.querySelector<HTMLSelectElement>('#categorySelect');
    let saveBtn = this.querySelector<any>('#saveBtn');


    categorySelect.addEventListener('change', () => {
      console.log(categorySelect.options[categorySelect.selectedIndex].value)
      if (categorySelect.options[categorySelect.selectedIndex].text!='') {
        saveBtn.disabled = false;
        saveBtn.classList.add('bg-green-500');
        saveBtn.classList.add('hover:bg-green-700');
        saveBtn.classList.remove('bg-green-300');
      
      }else{
        saveBtn.disabled = true;
        saveBtn.classList.add('bg-green-300');
        saveBtn.classList.remove('bg-green-500');
        saveBtn.classList.remove('hover:bg-green-700');
      }
      // if (categorySelect.value!='') {
      //   this.fetch(`https://hms.jedlik.cloud/api/restaurant/categories/${categorySelect.sele}`)
      // }
    })

    saveBtn.addEventListener('click',()=>{
      alert('sajt')
    })

    this.querySelector<HTMLElement>('#closeBtn').addEventListener('click', () => {
      this.closeModal();
    })
  }
  addNewCategoryModalEventListeners(): void {
    let newCategoryInput = this.querySelector<HTMLInputElement>('#newCategoryInput');
    let saveBtn = this.querySelector<HTMLInputElement>('#saveBtn');

    newCategoryInput.addEventListener('input', () => {
      if (newCategoryInput.value != '') {
        saveBtn.disabled = false;
        saveBtn.classList.add('bg-green-500');
        saveBtn.classList.add('hover:bg-green-700');
        saveBtn.classList.remove('bg-green-300');

      } else {
        saveBtn.disabled = true;
        saveBtn.classList.add('bg-green-300');
        saveBtn.classList.remove('bg-green-500');
        saveBtn.classList.remove('hover:bg-green-700');
      }
    })

    this.querySelector<HTMLElement>('#closeBtn').addEventListener('click', () => {
      this.closeModal();
    })


    saveBtn.addEventListener('click', () => {
      let body:string = `
      {
        "name": "${newCategoryInput.value}"
      }`
      this.fetch<any>('https://hms.jedlik.cloud/api/restaurant/categories','POST',body)
      .catch((err:Error)=>{
        this.querySelector<HTMLElement>('.error-box').classList.remove('hidden');
        this.querySelector<HTMLElement>('#errorMessage').innerText=err.message;
      })

      

    })
    this.querySelector<HTMLElement>('#closeErrorDiv').addEventListener('click',()=>{
      this.querySelector<HTMLElement>('.error-box').classList.add('hidden');
    })
  }
  addEventListeners() {
    this.querySelector<HTMLElement>('#newMeal').addEventListener('click', () => {
      this.querySelector<HTMLElement>('.content').classList.add('hidden');
      let modalDiv = this.querySelector<HTMLElement>('#restaurant-modal');
      this.getHtml('./modals/new-meal.html').then((html) => {
        modalDiv.innerHTML = html;
        this.addNewMealModalEventListeners();
      });
    });


    // this.openAndAddModalEventListeners('#newMeal','./modals/new-meal.html',this.addNewMealModalEventListeners)

    this.querySelector<HTMLElement>('#modifyCategory').addEventListener('click', () => {
      this.querySelector<HTMLElement>('.content').classList.add('hidden');
      let modalDiv = this.querySelector<HTMLElement>('#restaurant-modal');
      this.getHtml('./modals/modify-category.html').then((html) => {
        modalDiv.innerHTML = html;
        this.addModifyCategoryModalEventListeners();
      });
    });


    this.querySelector<HTMLElement>('#newCategory').addEventListener('click', () => {
      this.querySelector<HTMLElement>('.content').classList.add('hidden');
      let modalDiv = this.querySelector<HTMLElement>('#restaurant-modal');
      this.getHtml('./modals/new-category.html').then((html) => {
        modalDiv.innerHTML = html;
        this.addNewCategoryModalEventListeners();
      });
    });


    this.querySelector<HTMLElement>('#deleteCategory').addEventListener('click', () => {
      this.querySelector<HTMLElement>('.content').classList.add('hidden');
      let modalDiv = this.querySelector<HTMLElement>('#restaurant-modal');
      this.getHtml('./modals/delete-category.html').then((html) => {
        modalDiv.innerHTML = html;
        this.addDeleteCategoryModalEventListeners();
      });
    });


    // this.querySelector<HTMLElement>('#deleteMeal').addEventListener('click', (id) => {
    //   alert('Sajt')
    // });


    // this.querySelector<HTMLElement>('#modifyMeal').addEventListener('click', () => {
    //   alert('Sajt')
    // });


  }
}
new RestaurantAdminPage();