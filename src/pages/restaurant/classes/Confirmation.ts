export class Confirmation {

    content = document.querySelector('#restaurant-content');
    restaurantModalDiv = document.querySelector('#restaurant-modal');
    confirmationDiv = document.querySelector('#restaurant-confirmation');
    question(header:string, text: string): Promise<boolean> {


        //https://stackoverflow.com/questions/45613894/resolve-promise-into-addeventlistener
        if (this.confirmationDiv&&this.content) {
            const modal = this.createModalElement(header, text);
            this.blurBackground();
            this.confirmationDiv.appendChild(modal);

            return new Promise( (resolve, reject) => {      
                const closeButton = document.querySelector('#closeConfirmation');
                const yesButton = document.querySelector('#yesBtn');
                const noButton = document.querySelector('#noBtn');


                if (closeButton && yesButton && noButton && modal) {
                    closeButton.addEventListener('click', () => {                        
                        reject(null);                            
                        this.undoBlur();
                    });

                    yesButton.addEventListener('click', () => {
                        resolve(true);
                        this.undoBlur();
                    });

                    noButton.addEventListener('click', () => {
                        resolve(false);                            
                        this.undoBlur();
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
        <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
        <div class="modal-content bg-white rounded-lg shadow-md p-8 w-96">
          <span id="closeConfirmation" class="close text-gray-400 hover:text-gray-700 cursor-pointer absolute top-2 right-2">&times;</span>
          <div>
            <p class="block mb-2 font-bold">${header}</p>
            <p class="block mb-2">${text}</p>
          </div>
          <div class="flex justify-between">
            <button id="yesBtn" class="bg-green-600 text-white font-bold py-2 px-4 rounded">Igen</button>
            <button id="noBtn" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Nem</button>
          </div>
        </div>
    </div>
    `

        const modal = document.createElement('div');
        modal.classList.add('modal', 'd-block');
        modal.tabIndex = -1;
        modal.role = 'dialog';
        modal.id = 'modal-confirmation'
        modal.innerHTML = html;

        return modal;
    }

    blurBackground(): void {
        this.content?.classList.add('hidden');
        this.restaurantModalDiv?.classList.add('hidden');
    }
    undoBlur(): void {
        if (this.confirmationDiv) {
            this.content?.classList.remove('hidden');
            this.restaurantModalDiv?.classList.remove('hidden');
            this.confirmationDiv.innerHTML='';       
        }
    }

}