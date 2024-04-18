import { Page } from "../page.js";
import { Hir } from "./hir.js";

export class NewsPage extends Page {

    constructor() {
        super('/src/pages/news/news.html')
    }

    override getHtmlCallback(): void {
        this.generateNews();
        this.querySelector<HTMLInputElement>("#imgUpload").addEventListener("change",()=>{
          this.encodeImageFileAsURL(this.querySelector<HTMLInputElement>("#imgUpload"));
        });
    }

    generateNews(){

        this.fetch<Hir[]>("https://hms.jedlik.cloud/api/publicpages/news", "GET")
            .then((result)=>{
                var news = result;
                let reverse = false
                for (let i = 0; i < news.length; i++) {
                    if(i%2==1) reverse = true
                    let article: Hir = news[i] as Hir
                    article.date = article.date.slice(0,10)
                    this.generateArticle(reverse,article)
                }
            })
        
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
      ` ;
        newsContainer?.appendChild(element);
    }

    encodeImageFileAsURL(element: HTMLInputElement) {
      var filelist = element.files as FileList;
      var file = filelist[0];
      var reader = new FileReader();
      reader.onloadend = function() {
        NewsPage.parseResult(reader.result as string)
      }
      reader.readAsDataURL(file);
    }


    static parseResult(result:string){
      return result = result.slice(result.indexOf("base64")+7)
    }
}