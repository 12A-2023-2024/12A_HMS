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
}