import { Page } from "../page.js";
import { ContactsModel } from "./contactsModel.js";
import { SocialMediaItemModel } from "./socialMediaItemModel.js";
import { Login } from "../introduction/login.js";

export class ContactPage extends Page {

    constructor() {
        super('/src/pages/contact/contact.html')
    }

    override getHtmlCallback(): void {
        this.login().then((result) => {

            const endpoint = "https://hms.jedlik.cloud/api/about/contact";
            this.fetch<ContactsModel>(endpoint, "GET").then((contacts) => {
                if (contacts.email) {
                    this.querySelector<HTMLElement>("#email").innerText = contacts.email
                }
                if (contacts.telephone) {
                    this.querySelector<HTMLElement>("#phone").innerText = contacts.telephone
                }
                if (contacts.city) {
                    this.querySelector<HTMLElement>("#city").innerText = contacts.city + ","
                }
                if (contacts.address) {
                    this.querySelector<HTMLElement>("#address").innerText = contacts.address
                }
                if (contacts.postalCode) {
                    this.querySelector<HTMLElement>("#postalCode").innerText = contacts.postalCode
                }
                if (contacts.socialmedias) {
                    const socialMedias = this.querySelector<HTMLElement>("#socialmedias");
                    for (const socialMedia of contacts.socialmedias) {

                        let socialTemplate = `<a class="text-neutral-500" href="${socialMedia.socialUrl}" target="_blank">
                                                <div class="flex flex-wrap">
                                                    <img class="h-6" src="${socialMedia.iconURL}" alt=" ">
                                                    <p>${socialMedia.name}</p>
                                                </div>
                                            </a>`;
                        socialMedias.innerHTML += socialTemplate;

                    }
                }
            })
        })
    }

    afterLogin() {

    }

    async login() {
        const url: string = "https://hms.jedlik.cloud/api/login"
        const method: string = "POST"
        const body: any = {
            loginName: "admin",
            password: "admin"
        }
        const data = this.fetch<Login>(url, method, body)
        await data.then((result) => {
            localStorage.setItem('user', JSON.stringify(result));
        })
    }
}