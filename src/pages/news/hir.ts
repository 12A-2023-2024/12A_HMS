export class Hir {
    constructor(title: string, text: string, source: string, alt: string){
        
        let newsContainer = document.querySelector("#news-container");
        let element = document.createElement("div");

        ["mt-12","mb-16","flex","flex-wrap"].forEach(classelement => {
            element.classList.add(classelement);
        });

        element.innerHTML = 
        `
        <div class="mb-6 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-6/12 lg:pr-6">
          <div
            class="ripple relative overflow-hidden rounded-lg bg-cover bg-[50%] bg-no-repeat shadow-lg dark:shadow-black/20"
            data-te-ripple-init data-te-ripple-color="light">
            <img src="${source}" class="w-full" alt="${alt}" />
            <a href="#!">
              <div
                class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.2)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
              </div>
            </a>
          </div>
        </div>
    
        <div class="w-full shrink-0 grow-0 basis-auto lg:w-6/12 lg:pl-6">
          <h3 class="mb-4 text-2xl font-bold">${title}</h3>
          <div class="mb-4 flex items-center text-sm font-medium text-danger dark:text-danger-500">
          <p class="mb-6 text-neutral-500 dark:text-neutral-300 text-justify">
            ${text}
          </p>
        </div>
      ` ;
        newsContainer?.appendChild(element);
    }
}