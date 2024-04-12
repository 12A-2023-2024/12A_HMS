export class Page {

    contentDiv: HTMLElement | null = null;

    constructor(htmlPage: string) {
        this.contentDiv = document.getElementById('content');
        
        this.getHtml(htmlPage).then( (html) => {
            if (this.contentDiv) {
                this.contentDiv.innerHTML = html;
            }
        });
    }
    
    getHtml(url: string): Promise<string> {
        const requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };

        return fetch(url, requestOptions)
            .then( (response) => {
                return response.text()
            })
            .catch( (error) => {
                throw new Error(error);
            })
    }
    querySelector<T>(selector: string):T{
        return document.querySelector(selector) as T;
    }
    fetch<T>(url: string, method: string, body: any = null): Promise<T> {
        const userInfo = localStorage.getItem('user');   
        let token = '';
        if (userInfo) {
            token = JSON.parse(userInfo).token;
        }
        const requestOptions: RequestInit = {
            method: method,
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
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