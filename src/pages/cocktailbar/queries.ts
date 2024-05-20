export class ctQueries{
    token: string = "U3JUZXXAC5LR5BGU5YBHPTF0F0DMH4YP6M66M5BEXGCRWXZZC0GCQ2O689H2M820IHLG2K7OHVB5CW0A2RVMFNI60YTQBLHQ7S50V8XLVG99A9TXVD8YMGMI";
    baseUrl: string = "https://hms.jedlik.cloud/api/coctailbar/"
    constructor()
    {
        this.getCategories();
        this.doLogin();
    }

    async doLogin(){
        const url = 'https://hms.jedlik.cloud/api/login';
        this.fetch<{token:string, name:string, roles:string, validTo:string}>(url, 'POST', {
            "loginName": "admin",
            "password": "admin"
         })
            .then( (result) => {
                this.token = result.token;
                console.log(this.token)
            })
            .catch( (error) => {
                console.log(error)
            })
    }

    async getCategories(){
        
        return this.fetch<{
            id: number;
            name: string;
        }[]>(this.baseUrl + "categories", 'GET')
            
    }

    async getCocktails(){
        
        return this.fetch<{
            id: number;
            name: string;
            price: number;
            description: string;
            imageUrls: string[];
            categoryId: number;
            categoryName: string;
        }[]>(this.baseUrl + "coctails", 'GET')
    }

    async addCocktails() {
        
    }

    async addSale(guestId: number, cocktailId: number){
        return this.fetch(this.baseUrl + "sale", 'POST', {guestId: (+guestId), coctailId: cocktailId})
    }

    async getRoomNumbers(){
        return this.fetch<{
            id: number;

            roomNumber: number;
            roomTypeId: number;
            roomTypeName: string;   
        }[]>("https://hms.jedlik.cloud/api/rooms?onlyActives=true", 'GET')
    }

    async getSale(roomNumber: number){
        return this.fetch<{
            id: number;
            name: string;
            dateOfBirth: string;
        }[]>(this.baseUrl + "sale/" + roomNumber, 'GET')
    }

    fetch<T>(url: string, method: string, body: any = null): Promise<T> {
        const userInfo = localStorage.getItem('user');   
        let token = this.token;
        const requestOptions: RequestInit = {
            method: method,
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                "DateType": "json",
                


            },
            body: body ? JSON.stringify(body) : null
        };

        return fetch(url, requestOptions)
            .then( (response) => {
                if (response.status == 200) {
                    return response.text();
                } else if (response.status == 500) {                    
                    throw response;
                } else {
                    throw new Error(`Hiba a back-end hívás során (ErrorCode: ${response.status})`)
                }
            })
            .then( (data) => {
                if (data) {
                    return JSON.parse(data) as T
                }
                return null as T;
            })            
    }
}