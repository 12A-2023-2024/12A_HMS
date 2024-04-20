import { Page } from "../page.js";
import { ICategory } from "./interfaces/category.js";
import { IMeal } from "./interfaces/meal.js";

export class RestaurantAdminPage extends Page {
  categories:ICategory[]=[];
  meals:IMeal[]=[];
  mealPerPage:number=20;
  currentPage:number=1;
  constructor() {
    super("/src/pages/restaurant/restaurantAdmin.html");
    localStorage.setItem('user',`{
      "name": "administrator",
      "token": "VC6M06UYSL8S5I0VGJT04XGSDQ3O01OJ5MZ07Q5ILC1SUYXVVV18N85I62AQOMSI38OLKR2ZY19HPJQ9GNSMKQN87R22LV9PCV1DBFHQM5VY6AXQDQWI8V8K",
      "roles": [
          "admin"
      ],
      "validTo": "2024-04-20T12:58:45.2640386+00:00"
    }`)
    this.addEventListeners();
    this.loadCategories('#mainMessageBoxDiv','#mainMessage');
  }
  
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
  
      reader.onerror = () => {
        reject(new Error('Error reading file.'));
      };
  
      reader.readAsDataURL(file);
    });
  }
  loadMessageBox(message:string,isError:boolean){
    const div = this.querySelector<HTMLElement>('#mainMessageBoxDiv');
    let messageSpan = this.querySelector<HTMLElement>('#mainMessage');

    div.classList.remove('hidden')
    this.querySelector<HTMLElement>('#closeMainMessageBox').addEventListener('click',()=>{
      this.querySelector<HTMLElement>('#mainMessageBoxDiv').classList.add('hidden');
      if (isError) {
        div.classList.remove('bg-red-100 border border-red-400 text-red-700')
        
      }
    })
    if (isError) {
      div.classList.add('bg-red-100');
      div.classList.add('border');
      div.classList.add('border-red-400');
      div.classList.add('text-red-700');
    }else{
      div.classList.add('bg-green-100')
      div.classList.add('border')
      div.classList.add('border-green-400')
      div.classList.add('text-green-700')
    }
    messageSpan.innerText=message;
  }

  getMeals(){
    this.fetch<IMeal[]>('https://hms.jedlik.cloud/api/restaurant/menuitems','GET')
    .then((arr)=>{
      this.meals=arr;
      console.log(this.meals)
    })
    .catch((err:Error)=>{
      this.loadMessageBox(err.message,true);
    })
  }
  loadMeals(){
    const tbody =this.querySelector<HTMLElement>('tbody');
      tbody.innerHTML=''; 
      this.fetch<IMeal[]>('https://hms.jedlik.cloud/api/restaurant/menuitems','GET')
        .then((arr)=>{
          console.log(arr)
          //Az item per page counttal és sima forral jó lesz a különböző számú item megjelenítése
          arr.forEach(meal => {
            let images:string = `Nem található kép az ételhez.`
            if (meal.imageUrls.length!=0) {
              images='';
              meal.imageUrls.forEach(imgSource => {
                images+=`<img src="${imgSource}" width="40" height="40">\n`
              });
            }
            this.querySelector<HTMLElement>('tbody').innerHTML+=`
            <tr>
              <td class="border px-4 py-2 text-center">${meal.id}</td>
              <td class="border px-4 py-2 text-center">${meal.name}</td>
              <td class="border px-4 py-2 text-center">${meal.categoryName}</td>
              <td class="border px-4 py-2 text-center">${meal.price} Ft</td>
              <td class="border px-4 py-2 text-center">${meal.description}</td>
              <td class="border px-4 py-2 text-center">
                <div class="images">
                  ${images}
                </div>
              </td>
              <td class="border px-4 py-2 text-center">
                <div class="float-right">
                    <button class="px-8 mx-4 py-2 font-semibold text-sm bg-orange-500 text-white rounded-full shadow-sm align-middle float-right">Étel módosítása</button>
                    <button class="deleteButton px-8 mx-4 py-2 font-semibold text-sm bg-red-500 text-white rounded-full shadow-sm align-middle float-right"id="${meal.id}">Étel törlése</button>
                </div>
              </td>
            </tr>
            
            `
          });
          let buttons = document.querySelectorAll('.deleteButton');
          buttons.forEach((e)=>{
            e.addEventListener('click',()=>{
              let id = Number(e.getAttribute('id'))
              this.fetch(`https://hms.jedlik.cloud/api/restaurant/menuitems/${id}`,'DELETE')
              .then(()=>{
                alert('Sikeres törlés')
                this.loadMeals()
              })
              .catch((err:Error)=>{
                this.loadMessageBox(err.message,true)
              })
            })

          })
        })
  }
  loadCategories(errorDivSelector:string,errorMessageSelector:string){
    this.fetch<ICategory[]>('https://hms.jedlik.cloud/api/restaurant/categories','GET')
    .then((arr:ICategory[])=>{
      this.categories= arr;
    })
    .catch((error:Error)=>{
      this.querySelector<HTMLElement>(errorDivSelector).classList.remove('hidden');
      this.querySelector<HTMLElement>(errorMessageSelector).innerText=`${error.message}: kategóriák betöltése sikertelen`;
      this.loadMessageBox(error.message,true);
    })
  }

  closeModal(): void {
    this.querySelector<HTMLElement>('.content').classList.remove('hidden')
    this.querySelector<HTMLElement>('#restaurant-modal').innerHTML = '';
  }

  addNewMealModalEventListeners(): void {
    let newMealBtn = this.querySelector<HTMLElement>('#newMealBtn');

    let mealName = this.querySelector<HTMLInputElement>('#mealName');
    let mealCategory = this.querySelector<HTMLSelectElement>('#mealCategory');
    let mealDescription = this.querySelector<HTMLInputElement>('#mealDescription');
    let mealPrice = this.querySelector<HTMLInputElement>('#mealPrice');
    let mealImage = this.querySelector<HTMLInputElement>('#mealImage')
    this.categories.forEach(cat => {
      mealCategory.appendChild(new Option(cat.name,cat.id.toString()));
    });
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
      if (Number(mealPrice.value)<=0) {
        mealPrice.classList.add('border-rose-600')
        hasError = true;
      }
      // if (!mealImage.value) {
      //   mealImage.classList.add('border-rose-600')
      //   hasError = true;
      // }
      if (!hasError) {
        //TODO: képfeltöltés
        let imagesString =`{"filename":"","file":""}`
        // if (mealImage.files?.length==1) {
        //   this.fileToBase64(mealImage.files[0])
        //   .then((text:string)=>{
        //     console.log(text)
        //     imagesString=`   
        //       {
        //       "filename":${mealImage.files[0].name},
        //       "file":${text}
        //       }
              
        //     `
        //   })

          
        // }
        
        let body = `
        {
          "name": "${mealName.value}",
          "price": ${Number(mealPrice.value)},
          "description": "${mealDescription.value}",
          "categoryId": ${Number(mealCategory.options[mealCategory.selectedIndex].value)},
          "images": [${imagesString}]
        }
        
        `
        
        console.log(body)
        this.fetch<any>('https://hms.jedlik.cloud/api/restaurant/menuitems','POST',body)
        .then(()=>{
          this.loadMeals();
          this.closeModal();
        })
        .catch((err:Error)=>{
          alert(err.message)
        })
            
      }

    });
    

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
        .then(()=>{
          this.loadMessageBox('Sikeres kategória módosítás!',false);
          this.loadCategories('#mainMessageBoxDiv','#mainMessage');
          this.closeModal();

        })
        .catch((error:Error)=>{
          this.querySelector<HTMLElement>('#errorMessage').innerText=error.message;
        })
    })
    this.querySelector<HTMLElement>('#closeErrorDiv').addEventListener('click',()=>{
      this.querySelector<HTMLElement>('.error-box').classList.add('hidden');
    })
  }

  addDeleteCategoryModalEventListeners(): void {
    let categorySelect = this.querySelector<HTMLSelectElement>('#categorySelect');
    let deleteBtn = this.querySelector<any>('#deleteBtn');

    this.categories.forEach(category => {
      categorySelect.appendChild(new Option(category.name,category.id.toString()));
    });

    categorySelect.addEventListener('change', () => {
      console.log(categorySelect.options[categorySelect.selectedIndex].value)
      if (categorySelect.options[categorySelect.selectedIndex].text!='') {
        deleteBtn.disabled = false;
        deleteBtn.classList.add('bg-green-500');
        deleteBtn.classList.add('hover:bg-green-700');
        deleteBtn.classList.remove('bg-green-300');
      
      }else{
        deleteBtn.disabled = true;
        deleteBtn.classList.add('bg-green-300');
        deleteBtn.classList.remove('bg-green-500');
        deleteBtn.classList.remove('hover:bg-green-700');
      }
    })
    
    deleteBtn.addEventListener('click',()=>{
      if (categorySelect.value!='') {
        this.fetch(`https://hms.jedlik.cloud/api/restaurant/categories/${categorySelect.options[categorySelect.selectedIndex].value}`,'DELETE')
        .then(()=>{
          this.closeModal();
          this.loadCategories('#mainMessageBoxDiv','#mainMessage');

        })
        .catch((err:Error)=>{
          //TODO
        })
      }
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
      .then(()=>{
        this.loadMessageBox('Kategória sikeresen létrehozva!',false);
        this.closeModal();
        this.loadCategories('#mainMessageBoxDiv','#mainMessage');
      })
      .catch((err:Error)=>{
        this.querySelector<HTMLElement>('#errorDiv').classList.remove('hidden');
        this.querySelector<HTMLElement>('#errorMessage').innerText=err.message;
      })

      

    })
    this.querySelector<HTMLElement>('#closeErrorDiv').addEventListener('click',()=>{
      this.querySelector<HTMLElement>('#errorDiv').classList.add('hidden');
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
    this.querySelector<HTMLElement>('#itemPerPage').addEventListener('change',()=>{
      this.mealPerPage=this.querySelector<any>('#itemPerPage').value;
    })

    this.querySelector<HTMLElement>('#deleteCategory').addEventListener('click', () => {
      this.querySelector<HTMLElement>('.content').classList.add('hidden');
      let modalDiv = this.querySelector<HTMLElement>('#restaurant-modal');
      this.getHtml('./modals/delete-category.html').then((html) => {
        modalDiv.innerHTML = html;
        this.addDeleteCategoryModalEventListeners();
      });
    });


    this.querySelector<HTMLElement>('#searchMealBtn').addEventListener('click',()=>{           
      this.loadMeals();
    })

  }

}
new RestaurantAdminPage();
