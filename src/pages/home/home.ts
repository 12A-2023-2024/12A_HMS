import { Page } from "../page.js";
import { Contact } from "./contact.js";

export class HomePage extends Page {

    constructor() {
        super('/src/pages/home/home.html')
        
    }

    override getHtmlCallback(): void {
        this.loadFooterData()
    }

    loadFooterData(){
        this.fetch<Contact>("https://hms.jedlik.cloud/api/publicpages/contact", "GET")
            .then((result)=>{
                var data = result as Contact
                this.generateFooterHTML(data)
            })
    }

    generateFooterHTML(data: Contact){

        let footerElement = this.querySelector<HTMLElement>("footer");

        footerElement.innerHTML =
        `
            <div class="md:flex md:items-center md:justify-between md:p-4">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Jedlik™. All Rights Reserved.
            </span>
            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">

            </ul>
        </div>
        <div class="md:flex md:items-center md:justify-between md:p-4 text-sm text-gray-500 sm:text-center dark:text-gray-400">
            <span>${data.postalCode} ${data.city} ${data.address}</span>
            <span>${data.email}</span>
            <span>tel: ${data.telephone}</span>
            <span>adószám: ${data.taxNumber}</span>
        </div>
        `
        data.socialmedias.forEach(socialmedia=>{
            this.querySelector<HTMLElement>("footer ul").innerHTML+= 
            `
            <li>
            <a href="${socialmedia.socialUrl}"><img src="${socialmedia.iconURL}" alt="${socialmedia.name}" class="h-10"></a>
            </li>
            `
            console.log(socialmedia)
            console.log(socialmedia.socialUrl)
        })
    }
}