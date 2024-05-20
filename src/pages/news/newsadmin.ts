import { Login } from "../introduction/login.js";
import { Page } from "../page.js";
import { Hir } from "./hir.js";


export class NewsAdminPage extends Page {

    constructor() {
        super('/src/pages/news/newsadmin.html')
    }

    
    override getHtmlCallback(): void {
        this.generateNews();
        this.querySelector<HTMLButtonElement>("#newsPOST").addEventListener("click",()=>{
          this.postNews();
        })
        this.querySelector<HTMLButtonElement>("#btnconfirm").addEventListener("click",()=>{
          this.login();
        })
    }

    async generateNews(){
        this.querySelector<HTMLElement>("section").innerHTML = ''
        await this.fetch<Hir[]>("https://hms.jedlik.cloud/api/publicpages/news", "GET")
            .then((result)=>{
                var news = result;
                let reverse = false
                for (let i = 0; i < news.length; i++) {
                    if(i%2==1) reverse = true
                    else reverse = false
                    let article: Hir = news[i] as Hir
                    article.date = article.date.slice(0,10)
                    this.generateArticle(reverse,article)
                }
            })
        let delButtons = document.querySelectorAll(".news-delete")
        delButtons.forEach(button=>{
          button.addEventListener("click",()=>{
            this.deleteNews(button as HTMLButtonElement)
           })
        })
        
    }

    async deleteNews(button: HTMLButtonElement){
      let id = button.dataset.id
      await this.fetch<null>(`https://hms.jedlik.cloud/api/about/news/${id}`, "DELETE")
      this.generateNews()

    }

    generateArticle(reverse: boolean, article: Hir){
        let newsContainer = document.querySelector("#news-container")?.querySelector("section");
        let element = document.createElement("div");

        ["mt-12","mb-16","flex","flex-wrap"].forEach(classelement => {
            element.classList.add(classelement);
        });
        if(reverse) element.classList.add("lg:flex-row-reverse")

        element.innerHTML = 
        `
        <div class="mb-6 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-6/12 lg:pr-6">
          <div
            class="ripple relative overflow-hidden rounded-lg bg-cover bg-[50%] bg-no-repeat shadow-lg dark:shadow-black/20"
            data-te-ripple-init data-te-ripple-color="light">
            <img src="${article.pictureUrl}" class="w-full" alt="${article.alt}" />
            <a href="${article.href}">
              <div
                class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.2)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
              </div>
            </a>
          </div>
        </div>
    
        <div class="w-full shrink-0 grow-0 basis-auto lg:w-6/12 lg:pl-6">
          <h3 class="mb-4 text-2xl font-bold">${article.title}</h3>
          <h6 class="mb-4 text-neutral-500 italic">${article.date}</h6>
          <div class="mb-4 flex items-center text-sm font-medium text-danger dark:text-danger-500">
          <p class="mb-6 text-neutral-500 text-justify">
            ${article.text}
          </p>
          </div>
        <button class="bg-red-500 outline-black rounded-lg news-delete" data-id="${article.id}">Delete</button>
      ` ;
        newsContainer?.appendChild(element);

    }

    async postNews(){
      var filename = this.getImgName(this.querySelector<HTMLInputElement>("#imgUpload"));
      var file = await this.getBase64(this.querySelector<HTMLInputElement>("#imgUpload"));
      var date = this.getCurrentDate();
      var text = this.querySelector<HTMLTextAreaElement>("#uploadMainText").value;
      var title = this.querySelector<HTMLTextAreaElement>("#uploadHeaderText").value;

      var canProceed = true;
      if(!filename){
        console.log("filename")
        canProceed = false
      }
      if(!file){
        console.log("file")

        canProceed = false
      }
      if(!date){
        console.log("date")

        canProceed = false
      }
      if(!text){
        console.log("text")

        canProceed = false
      }
      if(!title){
        console.log("title")

        canProceed = false;
      }

      if(canProceed){
        const body = {
          date: date,
          text: text,
          title: title,
          image: {
              filename: filename,
              file: file
          },
        }
  
  
        this.querySelector<HTMLTextAreaElement>("#uploadMainText").value = '';
        this.querySelector<HTMLTextAreaElement>("#uploadHeaderText").value = '';
        this.querySelector<HTMLInputElement>("#imgUpload").value = ''
        
        await this.fetch<null>("https://hms.jedlik.cloud/api/about/news", "POST", body)
        this.generateNews()
      }


    }

    async getBase64(element: HTMLInputElement) {
      var filelist = element.files as FileList;
      var file = filelist[0];
      var filedata;
      if(!file) return null
      await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }).then(
        data => filedata = this.parseResult(data as string)
      );
      return filedata;
    }

    getImgName(element: HTMLInputElement){
      var filelist = element.files as FileList;
      var file = filelist[0];
      if(file) return file.name
    }

  //   async login(){
  //     const url: string = "https://hms.jedlik.cloud/api/login"
  //     const method: string = "POST"
  //     const body: any= {
  //         "loginName": "admin",
  //         "password": "admin"
  //      }
  //     const data = this.fetch<Login>(url, method, body)
  //     await data.then( (result) => {
  //         localStorage.setItem('user', JSON.stringify(result));
  //     })        
  // }


    parseResult(result:string){
      return result = result.slice(result.indexOf("base64")+7)
    }

    getCurrentDate(): string{
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      var date: string = yyyy + '-' + mm + '-' + dd;
      return date;
    }

    login() {
      var sucLogin : boolean = false;
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = JSON.stringify({
        "loginName": (document.getElementById("user") as HTMLInputElement).value.toString(),
        "password": (document.getElementById("pass") as HTMLInputElement).value.toString()
      });
  
       this.fetch<UserData>("https://hms.jedlik.cloud/api/login", "POST", body)
        .then((result) => {
          localStorage.setItem("user", JSON.stringify(result));
          localStorage.setItem("roles", JSON.stringify(result.roles));
          sucLogin = true;
          this.LoginVisual();
        })
        .catch((error) => {
          console.error(error);
          sucLogin = false;
        });
          (document.getElementById("pass") as HTMLInputElement).value = '';
          (document.getElementById("user") as HTMLInputElement).value = ''; 
      }

      LoginVisual() {
        var form = document.querySelector(".formforlogin")!;
        form.className = "formforlogin collapse";
        var logintext = document.querySelector(".bejelentkezesSzöveg")!;
        logintext.className = "font-bold bejelentkezesSzöveg collapse";
        this.querySelector<HTMLElement>("div.container div.container").innerHTML = '';
        // var innerheader = document.querySelector("#profilepicdiv")!;
        // innerheader.innerHTML += `<img id="profilepic" src="" alt="Profile Picture" >`;
      }

}

interface UserData{
  name: string;
  token: string;
  roles: string[];
  validTo: string;
}