export class Confirmation {

    question(header:string, text: string): Promise<boolean> {


        //https://stackoverflow.com/questions/45613894/resolve-promise-into-addeventlistener
        const body = document.querySelector('body');
        if (body) {
            const modal = this.createModalElement(header, text);
            const bgDiv = this.createBackgroundDiv();
            body.appendChild(modal);
            body.appendChild(bgDiv);

            return new Promise( (resolve, reject) => {      
                const closeButton = body.querySelector('div#modal-confirmation button.close');
                const yesButton = body.querySelector('div#modal-confirmation button.btn-success');
                const noButton = body.querySelector('div#modal-confirmation button.btn-danger');


                if (closeButton && yesButton && noButton && modal && bgDiv) {
                    closeButton.addEventListener('click', () => {
                        body.removeChild(modal);
                        body.removeChild(bgDiv);
                        reject(null);                            
                    });

                    yesButton.addEventListener('click', () => {
                        body.removeChild(modal);
                        body.removeChild(bgDiv);
                        resolve(true);
                    });

                    noButton.addEventListener('click', () => {
                        body.removeChild(modal);
                        body.removeChild(bgDiv);
                        resolve(false);                            
                    });
                }
                else {
                    reject('Hiányzó gomb...');
                }
            });
        }
        else {
            return new Promise( (resolve, reject) => {
                return reject("Hiba a kérdés megjelenítésekor");
            })
        }
    }

    createModalElement(header: string, text: string): HTMLElement {
        const html = `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${header}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>${text}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-dismiss="modal">Igen</button>
                    <button type="button" class="btn btn-danger">Nem</button>
                </div>
            </div>
        </div>`

        const modal = document.createElement('div');
        modal.classList.add('modal', 'd-block');
        modal.tabIndex = -1;
        modal.role = 'dialog';
        modal.id = 'modal-confirmation'
        modal.innerHTML = html;

        return modal;
    }

    createBackgroundDiv(): HTMLElement {
        const div = document.createElement('div');
        div.classList.add('modal-backdrop', 'fade', 'show');
        return div
    }

}