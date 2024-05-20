import { Page } from "../../page.js";
import { GalleryItemModel } from "../../../model/galleryItemModel.js";
import { Login } from "../../introduction/login.js";

export class GalleryAdminPage extends Page {

    data: GalleryItemModel[] |undefined
    currentId: number | undefined
    section: string;
    currentIndex: number | undefined
    orderNumber: number | undefined
    constructor() {
        super('/src/pages/gallery/admin/galleryAdmin.html');
        this.section = "carousel";
    }
    override getHtmlCallback(){
        this.login()
        this.changeSection(this.section)
        this.changeImages()
        this.getDatas()
        document.addEventListener("DOMContentLoaded", () => this.changeImagesOreder())
        this.changeImagesOreder();
        this.querySelector<HTMLElement>("#carouselMenu").addEventListener("click", () => this.changeSection("carousel"))
        this.querySelector<HTMLElement>("#bannerMenu").addEventListener("click", () => this.changeSection("banner"))
        this.querySelector<HTMLInputElement>("#sendButton").addEventListener("click", () => this.send())
        this.querySelector<HTMLInputElement>("#modifyButton").addEventListener("click", () => this.modify())
        this.querySelector<HTMLInputElement>("#uj-kep").addEventListener("click", () => this.ujKep())
        this.querySelector<HTMLInputElement>("#orderButton").addEventListener("click", () => this.orderChange())
        this.querySelector<HTMLInputElement>("#deleteButton").addEventListener("click", () => this.deleteImage())
        this.querySelector<HTMLInputElement>("#plusListElement").addEventListener("click", () => this.addInputListItem())
        this.querySelector<HTMLInputElement>("#minusListElement").addEventListener("click", () => this.deleteInputListItem())
    }

    async login(){
        const url: string = "https://hms.jedlik.cloud/api/login"
        const method: string = "POST"
        const body: any= {
            "loginName": "admin",
            "password": "admin"
         }
        const data = this.fetch<Login>(url, method, body)
        await data.then( (result) => {
            localStorage.setItem('user', JSON.stringify(result));
        })
    }
    deleteImage(){
        const url:string = `https://hms.jedlik.cloud/api/about/gallery/${this.currentId}`
        const method: string = "DELETE"
        const data = this.fetch<null>(url, method)
        this.clear()
        this.ujKep()
        alert("Módosítás folyamatban")
        this.getDatas()
    }

    changeData(fileData:string, newGallery: GalleryItemModel, methodString: string){
        if (typeof newGallery.order === 'undefined') {
            const imgs = document.querySelectorAll("img.draggable")
            newGallery.order = imgs.length + 1
        }
        const url: string = "https://hms.jedlik.cloud/api/about/gallery"
        const method: string = methodString
        let body: any = {
            order: newGallery.order,
            alt: newGallery.alt,
            href: newGallery.href,
            image: {
                filename: newGallery.alt,
                file: fileData
            }
        };
        if (newGallery.id){
            body.id = newGallery.id
        }
        this.fetch<null>(url, method, body);
        this.clear();
    }

    changeImages() {
        if (this.data) {
            this.data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            const imagesContainer = document.querySelector<HTMLElement>("#images-container")
            if (imagesContainer){
                imagesContainer.innerHTML = ""
            }
            for (let i = 0; i < this.data.length; i++) {
                const div = this.createElement<HTMLElement>("div");
                const image = this.createElement<HTMLImageElement>("img");
                div.className = "flex justify-center content-center w-32 mt-10 image-container"
                image.classList.add("w-1/2")
                image.classList.add("draggable")
                image.draggable = true
                image.addEventListener("click", () => this.modifySet(image))
                image.setAttribute("value", i.toString())
                if (image) {
                    image.src = this.data[i].pictureUrl ?? '';
                    imagesContainer?.appendChild(div)
                    div.appendChild(image)
                }
            }
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    modify(order: number | undefined = undefined){
        if (this.data){
            if (typeof this.currentIndex !== 'undefined'){
            const file = this.querySelector<HTMLInputElement>('#fileupload');
            if (typeof this.orderNumber !== 'undefined'){
                this.data[this.currentIndex].order = this.orderNumber
            }else{
                this.data[this.currentIndex].order = order ?? 0
            }
            this.data[this.currentIndex].id = this.currentId
            this.data[this.currentIndex].alt = this.querySelector<HTMLInputElement>('#alt').value
            this.data[this.currentIndex].href = this.querySelector<HTMLInputElement>('#href').value

            const newGallery = this.data[this.currentIndex]
            if (file && file.files && file.files.length > 0) {
                const fileData = this.getBase64(file)
                fileData.then(data => this.changeData(data, newGallery, "PUT"));
            }else{
                this.imageToBase64(this.data[this.currentIndex].pictureUrl ?? "")
                .then(base64String => {
                    return base64String;
                })
                .then(data => this.changeData(data, newGallery, "PUT"))
                .catch(error => {
                    console.error('Hiba történt:', error);
                });
            }
            this.ujKep()
            this.getDatas()
        }
    }
    }

    send(){
        const newGallery = new GalleryItemModel()
        const file = this.querySelector<HTMLInputElement>('#fileupload');
        newGallery.alt = this.querySelector<HTMLInputElement>('#alt').value;
        newGallery.href = this.querySelector<HTMLInputElement>('#href').value;
        try {
            const fileData = this.getBase64(file)
            fileData.then(data => this.changeData(data, newGallery, "POST"));
        } catch (error) {
            this.hibavanhülye(error);
        }
    }

    clear(){
        this.querySelector<HTMLInputElement>('#fileupload').value = "";
        this.querySelector<HTMLInputElement>('#alt').value = "";
        this.querySelector<HTMLInputElement>('#href').value = "";
        if (this.section === "banner"){
            this.querySelector<HTMLElement>("#inputs-main").innerHTML = ""
            this.addInputListItem()
            this.addInputListItem()
        }
        this.changeSection(this.section)
        this.changeImages()
    }

    async imageToBase64(url: string): Promise<string> {
        // 1. Kép letöltése a fetch API-val
        const response = await fetch(url);
    
        // Ellenőrizzük, hogy a válasz sikeres volt-e
        if (!response.ok) {
            throw new Error('Failed to fetch image.');
        }
    
        // 2. Kép átalakítása blob formátumra
        const blob = await response.blob();
    
        // 3. Blob átalakítása base64 formátumra
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = (reader.result as string).split(',')[1];
                resolve(base64data);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
    

    async getBase64(element: HTMLInputElement): Promise<string> {
        var filelist = element.files as FileList;
        var file = filelist[0];
        var filedata;
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        }).then(
          data => this.parseResult(data as string)
        );
      }
  
      parseResult(result:string): string {
        return result.slice(result.indexOf("base64")+7)
      }

      hibavanhülye(error: any){
        alert("A módosítás sikertelen!")
        console.log(error)
      }
  
      changeSection(sectionValue:string){
        const listMain = this.querySelectorAll<HTMLElement>(".list-main")
        const inputsMain = this.querySelector<HTMLElement>("#inputs-main")
        if (sectionValue === "banner"){
            listMain[0].classList.remove("hidden")
            listMain[1].classList.remove("hidden")
            this.querySelector<HTMLElement>("#inputs-main").innerHTML = ""
            this.addInputListItem()
            this.addInputListItem()
            this.section = "banner"
        }if (sectionValue === "carousel"){
            listMain[0].classList.add("hidden")
            listMain[1].classList.add("hidden")
            inputsMain.innerHTML = ""
            this.section = "carousel"
        }
        this.styleChange()
        this.getDatas()
      }

      styleChange(){
        const selectedStyle = "bg-slate-500 text-white text-2xl p-2"
        const DeSelectedStyle = "bg-slate-200 text-2xl p-2"
        const banner = this.querySelector<HTMLElement>("#bannerMenu")
        const carousel = this.querySelector<HTMLElement>("#carouselMenu")

        if (this.section === "banner"){
            banner.className = selectedStyle
            carousel.className = DeSelectedStyle
        }if (this.section === "carousel"){
            banner.className = DeSelectedStyle
            carousel.className = selectedStyle
        }
      }

      addInputListItem(){
        const inputsMain = this.querySelector<HTMLElement>("#inputs-main")
        const inputElement = this.createElement<HTMLInputElement>("input")
        if (inputElement){
            inputElement.className = "block bannerList bg-gray-300 border-2 border-slate-950 mt-1 px-2.5"
            inputElement.type = "text"
            inputElement.name = "title"
            inputElement.placeholder = "felsorolas"
        }
        inputsMain.appendChild(inputElement)
      }

      deleteInputListItem() {
        const inputsMain = document.querySelector("#inputs-main");
        if (inputsMain && inputsMain.children.length > 0) {
            const lastChild = inputsMain.lastChild;
            if (lastChild) {
                inputsMain.removeChild(lastChild);
            }
        }
    }
    
    async getDatas(){
        const url: string = "https://hms.jedlik.cloud/api/about/gallery";
        const method: string = "GET";
        this.fetch<GalleryItemModel[]>(url, method).then(
            result => {
                this.data = result;
                this.changeImages()
            }
        );
    }

    modifySet(img: HTMLElement){
        this.scrollToTop();
        const i = img.getAttribute("value") || "0"; // Assuming "0" as default
        this.currentIndex = parseInt(i);
        if (this.data){
            this.currentId = this.data[this.currentIndex].id
            this.orderNumber = this.data[this.currentIndex].order
            this.querySelector<HTMLInputElement>('#alt').value = this.data[this.currentIndex].alt ?? ""
            this.querySelector<HTMLInputElement>('#href').value = this.data[this.currentIndex].href ?? ""
            this.changeSection(this.section)
            this.querySelector<HTMLInputElement>("#modifyButton").classList.remove("hidden")
            this.querySelector<HTMLInputElement>("#uj-kep").classList.remove("hidden")
            this.querySelector<HTMLInputElement>("#deleteButton").classList.remove("hidden")
            this.querySelector<HTMLInputElement>("#sendButton").classList.add("hidden")
            this.querySelector<HTMLInputElement>("#felirat").innerText = "Módosítás"
        }
    }

    ujKep(){
        this.querySelector<HTMLInputElement>('#alt').value = ""
        this.querySelector<HTMLInputElement>('#href').value = ""
        this.changeSection(this.section)
        this.currentId = undefined
        this.querySelector<HTMLInputElement>("#modifyButton").classList.add("hidden")
        this.querySelector<HTMLInputElement>("#uj-kep").classList.add("hidden")
        this.querySelector<HTMLInputElement>("#deleteButton").classList.add("hidden")
        this.querySelector<HTMLInputElement>("#sendButton").classList.remove("hidden")
        this.querySelector<HTMLInputElement>("#felirat").innerText = "Új kép"
    }

    CountListElement(text:string | undefined){
            const title: string[] | undefined = text?.split("<li>")
            let listElement: string | undefined = ""
            if (title){
                const kezdetIndex = text?.indexOf(title[0]);

                // Ha található a "kezdet" a szövegben
                if (kezdetIndex != undefined){
                    if (kezdetIndex !== -1) {
                        listElement = text?.substring(kezdetIndex + title[0].length);
                    } else {
                    }
                }
                const items = this.extractListItems(listElement)
                return items
        }
    }

    extractListItems(htmlString: string | undefined){
        const parser = new DOMParser();
        if (htmlString){
            const doc = parser.parseFromString(htmlString, 'text/html');
            const listItems = doc.querySelectorAll('li');
            const itemsArray: string[] = [];
            listItems.forEach(item => {
                itemsArray.push(item.textContent || '');
            });
            return itemsArray;
        }    
    }




    // order
    changeImagesOreder(){
    var imagesContainer = document.getElementById('images-container');
    let draggedElement: HTMLElement | null = null;

    if (imagesContainer) {
        imagesContainer.addEventListener('dragstart', (event) => {
            const target = event.target as HTMLElement;
            if (target.tagName === 'IMG') {
                draggedElement = target;
                setTimeout(() => {
                    target.classList.add('dragging');
                }, 0);
            }
        });

        imagesContainer.addEventListener('dragend', (event) => {
            const target = event.target as HTMLElement;
            if (target.tagName === 'IMG') {
                target.classList.remove('dragging');
                draggedElement = null;
            }
        });

        imagesContainer.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        imagesContainer.addEventListener('drop', (event) => {
            event.preventDefault();
            const target = event.target as HTMLElement;
                if (target.tagName === 'IMG' && draggedElement && draggedElement !== target) {
                    this.swapImages(draggedElement, target);
                }
            });
        }
    };

    
    swapImages(img1: HTMLElement, img2: HTMLElement) {
        // Swap the src attributes
        const src1 = img1.getAttribute('src');
        const src2 = img2.getAttribute('src');
        const id1 = img1.getAttribute('value');
        const id2 = img2.getAttribute('value');
        if (src1 && src2 && id1 && id2) {
            img1.setAttribute('src', src2);
            img2.setAttribute('src', src1);
            img1.setAttribute('value', id2);
            img2.setAttribute('value', id1);
        }
    }
    
    orderChange(){
        const imgs = document.querySelectorAll("img.draggable")
        for (let i = 0; i < imgs.length; i++) {
            const value = imgs[i].getAttribute("value")
            const src = imgs[i].getAttribute("src")
            if (value){
                this.currentId = parseInt(value)
            }
            const img = imgs[i] as HTMLElement | undefined
            if (img){
                this.modifySet(img)
            }
            if (this.data){
                for (let y = 0; y < this.data.length; y++) {
                    if (this.data[y].pictureUrl == src){
                        this.currentIndex = y
                        this.orderNumber = undefined
                        this.modify(i)
                        break
                   }
                }
            }
        }
    }
}