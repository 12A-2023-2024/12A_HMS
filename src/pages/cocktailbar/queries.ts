export class ctQueries{
    token: string = "";
    baseUrl: string = "https://hms.jedlik.cloud/api/coctailbar/"
    constructor()
    {
        
    }

    async doLogin(){
        const url = 'https://hms.jedlik.cloud/api/login';
        return this.fetch<{token:string, name:string, roles:string, validTo:string}>(url, 'POST', {
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

    async postCocktail(data:{}) {
        console.log(`data as given: - ${data}`)
        console.log(`data after stringify: - ${JSON.stringify(data)}`)
        this.fetch(this.baseUrl + 'coctails', 'POST', JSON.stringify(data))
    }

    async getBase64Img(file:File) {
        const base64String = await this.convertFileToBase64(file)                    
        return base64String?.split(',')[1]
    }

    async convertFileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    async deleteCocktail(id:number) {
        this.fetch(this.baseUrl + `coctails/${id}`, 'DELETE')
    }

    async fetchCmsData(url:string) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    }

    async fetchImage(data:Array<{name:string, price:string, description:string, categoryId:string, image:string}>) {
        let response:any | null = null
        const blobs:Array<any> = new Array()
        
        data.forEach(element => {
            const imgBaseUrl = 'src/pages/cocktailbar/components/imgs/'
            response = fetch(imgBaseUrl + element.image)                        
        });
        if (!(await response).ok) {
            throw new Error(`HTTP error! status: ${(await response).status}`);
        }

        const blob = await (await response).blob();
        blobs.push(blob)
        return blobs;
    }

    async composePayload() {
        console.log('compose payload called')
        try {
            const data = await this.fetchCmsData('src/pages/cocktailbar/components/drinkData.json')
            
            const fileBlob = await this.fetchImage(data)

            fileBlob.forEach(blob => {
                const imageFile = new File([blob], data.image, {type:blob.type})
    
                const payload = {
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    categoryId: data.categoryId,
                    images: [
                        {
                            filename: imageFile.name,
                            file: this.getBase64Img(imageFile)
                        }
                    ]
                }       
                this.postCocktail(payload)
                
                
            });


        } catch (error) {
            console.log(`error thrown at cocposition: - ${error}`)
        }
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

    async fetch<T>(url: string, method: string, body: any = null): Promise<T> {
        if(this.token == "" && url != 'https://hms.jedlik.cloud/api/login'){
            await this.doLogin();
        }


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