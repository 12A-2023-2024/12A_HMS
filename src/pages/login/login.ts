import { Page } from "../page.js";
import { RestaurantAdminPage } from "../restaurant/restaurantAdmin.js";
import { User } from "./user.js";

export class Login extends Page {
    constructor() {
        super('/src/pages/login/login.html');
    }

    override getHtmlCallback(): void {
        this.querySelector<HTMLButtonElement>('#loginBtn').addEventListener('click', () => {
            let body = `{
                "loginName": "admin",
                "password": "admin"
             }`
            this.fetch<User>('https://hms.jedlik.cloud/api/login', 'POST', body)
                .then((result:User) => {
                    localStorage.setItem('user', JSON.stringify(result))
                    switch (window.location.search) {
                        case '?page=restaurantAdmin':
                            new RestaurantAdminPage();                     
                            break;
                    
                        default:
                            new Login()
                            break;
                    }
                })
                .catch((err:Error)=>{console.log(err.message)})
        })
        this.querySelector<HTMLButtonElement>('#logoutBtn').addEventListener('click',()=>{
        let userString = localStorage.getItem('user');  
        if (userString) {
            localStorage.removeItem('user');
        }
        })
        
    }
}