import { Page } from "../page.js";
import { Confirmation } from "./classes/confirmation.js";
import { MealImage } from "./classes/meal-image.js";
import { ICategory } from "./interfaces/category.js";
import { IMeal } from "./interfaces/meal.js";

export class RestaurantAdminPage extends Page {
  categories: ICategory[] = [];
  meals: IMeal[] = [];
  mealPerPage: number = 20;
  currentPage: number = 1;
  maxPage: number = 1
  constructor() {
    super('/src/pages/restaurant/restaurantAdmin.html');
    localStorage.setItem('user', `{
    }`)
    this.loadCategories('#mainMessageBoxDiv', '#mainMessage');

  }

  getHtmlCallback(): void {
    this.addEventListeners();
  }


  convertImagesArrayToBase64(formImages : File[]){
    let images : MealImage[] = [];
    formImages.forEach((image) => {
        if (image instanceof File) {
            this.fileToBase64(image).then((base64) => {
                images.push(new MealImage(image.name, base64));
            });
        }
    })
    return images;
  }

  fileToBase64 = (file: File) : Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).replace('data:', '').replace(/^.+,/, ''));
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

  mockMeal() {
    for (let index = 0; index < 60; index++) {
      let _meal:IMeal = {categoryName:"sajt",categoryId:2,description:"sasas",id:30,name:"sajt",price:200,imageUrls:[]}
      this.meals.push(_meal);
    }
  }

  addModifyMealEventListeners(id:number) {
    let mealImage = this.querySelector<HTMLInputElement>('#mealImage');
    let mealName = this.querySelector<HTMLInputElement>('#mealName');
    let mealCategory = this.querySelector<HTMLSelectElement>('#mealCategory');
    let mealDescription = this.querySelector<HTMLInputElement>('#mealDescription');
    let mealPrice = this.querySelector<HTMLInputElement>('#mealPrice');

    let images:MealImage[]=[];
    mealImage.addEventListener("change", (e) => {
      const formData = new FormData(document.querySelector("form") as HTMLFormElement);
      const formImages = formData.getAll("images");
      images = this.convertImagesArrayToBase64(formImages as File[]);
    });

    this.querySelector<HTMLElement>('#closeBtn').addEventListener('click',()=>this.closeModal());

    this.querySelector<HTMLElement>('#modifyMealButton').addEventListener('click',(()=>{
      this.categories.forEach(cat => {
        mealCategory.appendChild(new Option(cat.name, cat.id.toString()));
      });
      const inputs = ['mealName', 'mealCategory', 'mealDescription', 'mealPrice', 'mealImage'];
      inputs.forEach(element => {
        this.querySelector<HTMLElement>(`#${element}`).addEventListener('focus', (event) => {
          if (event.target) {
            (<HTMLElement>event.target).classList.remove('border-rose-600');
          }
        })
      })

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
      if (Number(mealPrice.value) <= 0) {
        mealPrice.classList.add('border-rose-600')
        hasError = true;
      }
      if (!mealImage.value) {
        mealImage.classList.add('border-rose-600')
        hasError = true;
      }

      if (!hasError) {
        let body = `
        {
          "id":${id},
          "name": "${mealName.value}",
          "price": ${Number(mealPrice.value)},
          "description": "${mealDescription.value}",
          "categoryId": ${Number(mealCategory.options[mealCategory.selectedIndex].value)},
          "images": ${JSON.stringify(images)}
        }
        
        `
        this.fetch<any>('https://hms.jedlik.cloud/api/restaurant/menuitems', 'PUT', body)
          .then(() => {
            this.loadMeals();
            this.closeModal();
            this.loadMessageBox('Étel sikeresen megváltoztatva!',false);
          })
          .catch((err: Error) => {
            this.closeModal();
            this.loadMessageBox(err.message,true);
          })

      }
    }))
  }
  mealButtonsEventListeners():void{
    let deleteButtons = document.querySelectorAll('.deleteButton');
    let modifyButtons = document.querySelectorAll('.modifyButton');

    deleteButtons.forEach((e) => {
      e.addEventListener('click', () => {
        let id = Number(e.getAttribute('id'))
        new Confirmation().question('Megerősítés',`Biztosan törli a következő ételt: ${e.getAttribute('name')}?`)
        .then((result:boolean)=>{
          if (result) {
            this.fetch<IMeal>(`https://hms.jedlik.cloud/api/restaurant/menuitems/${id}`, 'DELETE')
            .then(() => {
              this.loadMessageBox('Étel sikeresen törölve!', false)
              this.loadMeals()
              })
            .catch((err: Error) => {
              this.loadMessageBox(err.message, true);
            })
          }
        })
        .catch((err:Error)=>{
          this.loadMessageBox(err.message,true);
        })
        
      })
    })
    modifyButtons.forEach((e)=>{
      e.addEventListener('click',()=>{
        let id = Number(e.getAttribute('id'));
        let modalDiv = this.querySelector<HTMLElement>('#restaurant-modal');
        this.fetch<IMeal>(`https://hms.jedlik.cloud/api/restaurant/menuitems/${id}`,'GET')
        .then((meal:IMeal)=>{
            // this.querySelector<HTMLElement>('#restaurant-content').classList.add('hidden');
            // this.querySelector<HTMLElement>('nav').classList.add('hidden');

            this.getHtml('./src/pages/restaurant/modals/modify-meal.html').then((html) => {
              modalDiv.innerHTML = html;
              this.addModifyMealEventListeners(id);

              this.querySelector<HTMLInputElement>('#mealName').value=meal.name;
              this.querySelector<HTMLInputElement>('#mealDescription').value=meal.description;

              this.categories.forEach(category => {
                if (category.name==meal.categoryName) {
                  this.querySelector<HTMLSelectElement>('#mealCategory').options.add(new Option(category.name,category.id.toString(),undefined,true))
                }else{
                this.querySelector<HTMLSelectElement>('#mealCategory').options.add(new Option(category.name,category.id.toString()))
                }
                
              });
              
              this.querySelector<HTMLInputElement>('#mealPrice').value=meal.price.toString();     
            })
          })
          .catch((err:Error)=>{
            this.loadMessageBox(err.message,true);
          })
          
      })
    })
  }
  generateTableRows(){
    const tbody = this.querySelector<HTMLElement>('tbody');
    this.querySelector<HTMLElement>('thead').innerHTML=`
    <tr>
      <th>ID</th>
      <th>Étel neve</th>
      <th>Kategória</th>
      <th>Ár</th>
      <th>Leírás</th>
      <th>Képek</th>
      <th></th>
    </tr>`
    if (this.currentPage==1) {
      tbody.innerHTML = '';
      for (let index = 0; index < this.mealPerPage; index++) {
        tbody.innerHTML += this.generateTableRow(this.meals[index]) 
        this.mealButtonsEventListeners();
      }
    } else if(this.mealPerPage!=1&&this.mealPerPage!=this.maxPage){
      tbody.innerHTML = '';
      for (let index = this.mealPerPage*(this.currentPage-1); index < this.mealPerPage*(this.currentPage); index++) {
        tbody.innerHTML += this.generateTableRow(this.meals[index]) 
        this.mealButtonsEventListeners();
      }
    }else if(this.currentPage==this.maxPage){
      tbody.innerHTML = '';
      for (let index = this.mealPerPage*(this.currentPage-1); index < this.meals.length-(this.mealPerPage*(this.currentPage-1)); index++) {
        tbody.innerHTML += this.generateTableRow(this.meals[index]) 
        this.mealButtonsEventListeners();

      }
    }
  }
  generateTableRow(meal:IMeal){
    let images: string = `Nem található kép az ételhez.`
    if (meal.imageUrls.length != 0) {
      images = '';
      meal.imageUrls.forEach(imgSource => {
        images += `<img src="${imgSource}" class="" width="50" height="50">\n`
      });
    }
    
    let result = `
      <tr>
      <td class="border px-4 py-2 text-center">${meal.id}</td>
      <td class="border px-4 py-2 text-center">${meal.name}</td>
      <td class="border px-4 py-2 text-center">${meal.categoryName}</td>
      <td class="border px-4 py-2 text-center">${meal.price} Ft</td>
      <td class="border content-center text-center"><textarea class="resize-none bg-white" disabled readonly>${meal.description}</textarea></td>
      <td class="border px-4 py-2 text-center">
      <div class="images flex">
        ${images}
      </div>
      </td>
      <td class="border px-4 py-2 text-center">
      <div class="float-right">
        <button class="deleteButton px-8 mx-4 py-2 font-semibold text-sm bg-red-500 text-white rounded-full shadow-sm align-middle float-right" id="${meal.id}" name="${meal.name}">Étel törlése</button>
        <button class="modifyButton px-8 mx-4 py-2 font-semibold text-sm bg-orange-500 text-white rounded-full shadow-sm align-middle" id="${meal.id}">Étel módosítása</button>
      </div>
      </td>
      </tr>
    
    `
    return result;
  }
  loadMessageBox(message: string, isError: boolean) {
    const div = this.querySelector<HTMLElement>('#mainMessageBoxDiv');
    let messageSpan = this.querySelector<HTMLElement>('#mainMessage');

    div.classList.remove('hidden')
    div.classList.add('border');
    this.querySelector<HTMLElement>('#closeMainMessageBox').addEventListener('click', () => {
      this.querySelector<HTMLElement>('#mainMessageBoxDiv').classList.add('hidden');
    })
    if (isError) {
      div.classList.add('bg-red-100');
      div.classList.add('border-red-400');
      div.classList.add('text-red-700');
      div.classList.remove('bg-green-100')
      div.classList.remove('border-green-400')
      div.classList.remove('text-green-700')
    } else {
      div.classList.add('bg-green-100')
      div.classList.add('border-green-400')
      div.classList.add('text-green-700')
      div.classList.remove('bg-red-100');
      div.classList.remove('border-red-400');
      div.classList.remove('text-red-700');

    }
    messageSpan.innerText = message;
  }
  loadMeals() {
    let searchBox = this.querySelector<HTMLInputElement>('#searchMeal');
    this.querySelector<HTMLElement>('#pager-div').classList.add('hidden');      


    this.fetch<IMeal[]>('https://hms.jedlik.cloud/api/restaurant/menuitems', 'GET')
      .then((arr) => {
        this.meals=[];
        if (!searchBox.value) {
          this.meals = arr;        
          this.mockMeal();    
        }else if (searchBox.value) {
          for (let index = 0; index < arr.length; index++) {
            const meal = arr[index];
            if (meal.name.toLowerCase().includes(searchBox.value.toLowerCase())) {
              this.meals.push(arr[index])
            }
          }
        }
        if (this.meals.length>this.mealPerPage) {
          this.querySelector<HTMLElement>('#pager-div').classList.remove('hidden');      
        }
        this.generateTableRows()
        this.maxPage= Math.ceil(this.meals.length/this.mealPerPage);

      })

  }
  loadCategories(errorDivSelector: string, errorMessageSelector: string) {
    this.fetch<ICategory[]>('https://hms.jedlik.cloud/api/restaurant/categories', 'GET')
      .then((arr: ICategory[]) => {
        this.categories = arr;
      })
      .catch((error: Error) => {
        this.querySelector<HTMLElement>(errorDivSelector).classList.remove('hidden');
        this.querySelector<HTMLElement>(errorMessageSelector).innerText = `${error.message}: kategóriák betöltése sikertelen`;
        this.loadMessageBox(error.message, true);
      })
  }

  closeModal(): void {
    this.querySelector<HTMLElement>('#restaurant-content').classList.remove('hidden')
    this.querySelector<HTMLElement>('nav').classList.remove('hidden');

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
      mealCategory.appendChild(new Option(cat.name, cat.id.toString()));
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
    let images:MealImage[]= [];
    mealImage.addEventListener("change", (e) => {
      const formData = new FormData(document.querySelector("form") as HTMLFormElement);
      const formImages = formData.getAll("images");
      images = this.convertImagesArrayToBase64(formImages as File[]);
    });

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
      if (Number(mealPrice.value) <= 0) {
        mealPrice.classList.add('border-rose-600')
        hasError = true;
      }
      if (!mealImage.value) {
        mealImage.classList.add('border-rose-600')
        hasError = true;
      }
      if (!hasError) {
        let body = `
        {
          "name": "${mealName.value}",
          "price": ${Number(mealPrice.value)},
          "description": "${mealDescription.value}",
          "categoryId": ${Number(mealCategory.options[mealCategory.selectedIndex].value)},
          "images": ${JSON.stringify(images)}
        }
        
        `
        this.fetch<any>('https://hms.jedlik.cloud/api/restaurant/menuitems', 'POST', body)
          .then(() => {
            this.loadMeals();
            this.closeModal();
            this.loadMessageBox('Új étel sikeresen hozzáadva!',false);
          })
          .catch((err: Error) => {
            this.loadMessageBox(err.message,true);
            this.closeModal();
          })

      }

    });


  }

  addModifyCategoryModalEventListeners(): void {
    let categorySelect = this.querySelector<any>('#categorySelect');
    let categoryInput = this.querySelector<HTMLInputElement>('#categoryInput');
    let saveBtn = this.querySelector<HTMLInputElement>('#saveBtn');
    let previousText = '';

    this.loadCategories('.error-box', '#errorMessage');


    this.categories.forEach(category => {
      categorySelect.appendChild(new Option(category.name, category.id.toString()));
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
      this.fetch('https://hms.jedlik.cloud/api/restaurant/categories', 'PUT', body)
        .then(() => {
          this.loadMessageBox('Sikeres kategória módosítás!', false);
          this.loadCategories('#mainMessageBoxDiv', '#mainMessage');
          this.closeModal();

        })
        .catch((error: Error) => {
          this.querySelector<HTMLElement>('#errorMessage').innerText = error.message;
        })
    })
    this.querySelector<HTMLElement>('#closeErrorDiv').addEventListener('click', () => {
      this.querySelector<HTMLElement>('.error-box').classList.add('hidden');
    })
  }

  addDeleteCategoryModalEventListeners(): void {
    let categorySelect = this.querySelector<HTMLSelectElement>('#categorySelect');
    let deleteBtn = this.querySelector<any>('#deleteBtn');

    this.categories.forEach(category => {
      categorySelect.appendChild(new Option(category.name, category.id.toString()));
    });

    categorySelect.addEventListener('change', () => {
      console.log(categorySelect.options[categorySelect.selectedIndex].value)
      if (categorySelect.options[categorySelect.selectedIndex].text != '') {
        deleteBtn.disabled = false;
        deleteBtn.classList.add('bg-green-500');
        deleteBtn.classList.add('hover:bg-green-700');
        deleteBtn.classList.remove('bg-green-300');

      } else {
        deleteBtn.disabled = true;
        deleteBtn.classList.add('bg-green-300');
        deleteBtn.classList.remove('bg-green-500');
        deleteBtn.classList.remove('hover:bg-green-700');
      }
    })

    deleteBtn.addEventListener('click', () => {
      if (categorySelect.value != '') {
        new Confirmation().question('Megerősítés',`Biztosan törölni kívánja a következő kategóriát: ${categorySelect.options[categorySelect.selectedIndex].text}?`)
        .then((result:boolean)=>{
          if (result) {
            this.fetch(`https://hms.jedlik.cloud/api/restaurant/categories/${categorySelect.options[categorySelect.selectedIndex].value}`, 'DELETE')
              .then(() => {
                this.closeModal();
                this.loadCategories('#mainMessageBoxDiv', '#mainMessage');
                this.loadMessageBox('Sikeresen törölte a ketegóriát!',false);
              })
              .catch((err: Error) => {
                this.loadMessageBox(err.message,true);
              })
            
          }
        })
        .catch((err:Error)=>{
          this.loadMessageBox(err.message,true);
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
      let body: string = `
      {
        "name": "${newCategoryInput.value}"
      }`
      this.fetch<any>('https://hms.jedlik.cloud/api/restaurant/categories', 'POST', body)
        .then(() => {
          this.loadMessageBox('Kategória sikeresen létrehozva!', false);
          this.closeModal();
          this.loadCategories('#mainMessageBoxDiv', '#mainMessage');
        })
        .catch((err: Error) => {
          this.querySelector<HTMLElement>('#errorDiv').classList.remove('hidden');
          this.querySelector<HTMLElement>('#errorMessage').innerText = err.message;
        })



    })
    this.querySelector<HTMLElement>('#closeErrorDiv').addEventListener('click', () => {
      this.querySelector<HTMLElement>('#errorDiv').classList.add('hidden');
    })
  }
  addEventListeners() {
    this.querySelector<HTMLElement>('#newMeal').addEventListener('click', () => {
      // this.querySelector<HTMLElement>('#restaurant-content').classList.add('hidden');
      // this.querySelector<HTMLElement>('nav').classList.add('hidden');
      let modalDiv = this.querySelector<HTMLElement>('#restaurant-modal');
      this.getHtml('/src/pages/restaurant/modals/new-meal.html').then((html) => {
        modalDiv.innerHTML = html;
        this.addNewMealModalEventListeners();
      });
    });

    this.querySelector<HTMLElement>('#modifyCategory').addEventListener('click', () => {
      // this.querySelector<HTMLElement>('#restaurant-content').classList.add('hidden');
      // this.querySelector<HTMLElement>('nav').classList.add('hidden');
      let modalDiv = this.querySelector<HTMLElement>('#restaurant-modal');
      this.getHtml('/src/pages/restaurant/modals/modify-category.html').then((html) => {
        modalDiv.innerHTML = html;
        this.addModifyCategoryModalEventListeners();
      });
    });


    this.querySelector<HTMLElement>('#newCategory').addEventListener('click', () => {
      // this.querySelector<HTMLElement>('#restaurant-content').classList.add('hidden');
      // this.querySelector<HTMLElement>('nav').classList.add('hidden');
      let modalDiv = this.querySelector<HTMLElement>('#restaurant-modal');
      this.getHtml('/src/pages/restaurant/modals/new-category.html').then((html) => {
        modalDiv.innerHTML = html;
        this.addNewCategoryModalEventListeners();
      });
    });
    this.querySelector<HTMLElement>('#itemPerPage').addEventListener('change', () => {
      this.mealPerPage = this.querySelector<any>('#itemPerPage').value;
    })

    this.querySelector<HTMLElement>('#deleteCategory').addEventListener('click', () => {
      // this.querySelector<HTMLElement>('#restaurant-content').classList.add('hidden');
      // this.querySelector<HTMLElement>('nav').classList.add('hidden');

      let modalDiv = this.querySelector<HTMLElement>('#restaurant-modal');
      this.getHtml('/src/pages/restaurant/modals/delete-category.html').then((html) => {
        modalDiv.innerHTML = html;
        this.addDeleteCategoryModalEventListeners();
      });
    });


    this.querySelector<HTMLElement>('#searchMealBtn').addEventListener('click', () => {
      this.loadMeals();
    })

    let pagerNext = this.querySelector<HTMLElement>('#pager-next');
    let pagerLast = this.querySelector<HTMLElement>('#pager-last');
    let pagerFirst = this.querySelector<HTMLElement>('#pager-first');
    let pagerPrevious = this.querySelector<HTMLElement>('#pager-previous');
    let pagerCurrent = this.querySelector<HTMLElement>('#pager-current');
    pagerNext.addEventListener('click', () => {
      if (this.currentPage<this.maxPage) {
        if (this.currentPage==this.maxPage-1) {
          pagerLast.classList.remove('cursor-pointer');
          pagerNext.classList.remove('cursor-pointer');
        }
        pagerFirst.classList.add('cursor-pointer');
        pagerPrevious.classList.add('cursor-pointer');
        this.currentPage++;
        pagerCurrent.innerText = this.currentPage.toString();
        this.generateTableRows();
        
      }
    })
    pagerPrevious.addEventListener('click', () => {
      if (this.currentPage>1) {
        if (this.currentPage==2) {
          pagerFirst.classList.remove('cursor-pointer');
          pagerPrevious.classList.remove('cursor-pointer');
        }
        pagerLast.classList.add('cursor-pointer');
        pagerNext.classList.add('cursor-pointer');
        this.currentPage--;
        pagerCurrent.innerText = this.currentPage.toString();
        this.generateTableRows();
        
      }

    })
    pagerLast.addEventListener('click',()=>{
      this.currentPage=this.maxPage;
      pagerCurrent.innerText = this.currentPage.toString();
      pagerLast.classList.remove('cursor-pointer');
      pagerNext.classList.remove('cursor-pointer');
      pagerFirst.classList.add('cursor-pointer');
      pagerPrevious.classList.add('cursor-pointer');
      this.generateTableRows();

    })
    pagerFirst.addEventListener('click',()=>{
      this.currentPage=1;
      pagerCurrent.innerText = this.currentPage.toString();
      pagerFirst.classList.remove('cursor-pointer');
      pagerPrevious.classList.remove('cursor-pointer');
      pagerLast.classList.add('cursor-pointer');
      pagerNext.classList.add('cursor-pointer');
      this.generateTableRows();

    })
  }
}