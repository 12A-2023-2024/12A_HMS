export class Page {

    contentDiv: HTMLElement | null = null;

    constructor(htmlPage: string) {
        this.contentDiv = document.getElementById('content');

        this.getHtml(htmlPage).then((html) => {
            if (this.contentDiv) {
                this.contentDiv.innerHTML = html;
                this.getHtmlCallback();
            }
        });
    }

    getHtmlCallback() {

    }

    async getHtml(url: string): Promise<string> {
        const requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };

        return fetch(url, requestOptions)
            .then((response) => {
                return response.text()
            })
            .catch((error) => {
                throw new Error(error);
            })
    }

    querySelector<T>(selector: string): T {
        return document?.querySelector(selector) as T;
    }

    createElement<T>(htmlTag: string): T {
        let element = document?.createElement(htmlTag);
        return element as T;
    }

    querySelectorAll<T>(selector: string): Array<T> {
        let l: Array<T> = [];
        document?.querySelectorAll(selector).forEach(element => {
            l.push(element as T)
        });
        return l;
    }

    #getRequestInit(method: string, body: any = null): RequestInit {
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

        return requestOptions;
    }
    async fetchAny(url: string, method: string, body: any = null): Promise<Response> {
        const requestOptions = this.#getRequestInit(method, body);
        return fetch(url, requestOptions)
            .then((response) => {
                if (response.status == 200) {
                    return response;
                } else if (response.status == 500) {
                    alert(response.status)
                    throw response;
                } else {
                    alert(response.status)
                    throw new Error(`Hiba a back-end hívás során (ErrorCode: ${response.status})`)
                }
            });
    }

    async fetch<T>(url: string, method: string, body: any = null): Promise<T> {
        return this.fetchAny(url, method, body)
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                if (data) {
                    return JSON.parse(data) as T
                }
                return null as T;
            })
    }
}