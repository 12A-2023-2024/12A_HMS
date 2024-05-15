export class Confirmation {

    restaurantModalDiv = document.querySelector('#restaurant-modal');
    confirmationDiv = document.querySelector('#restaurant-confirmation');
    question(header:string, text: string): Promise<boolean> {


        //https://stackoverflow.com/questions/45613894/resolve-promise-into-addeventlistener
        if (this.confirmationDiv) {
            const modal = this.createModalElement(header, text);
            this.blurBackground();
            this.confirmationDiv.appendChild(modal);

            return new Promise( (resolve, reject) => {      
                const yesButton = document.querySelector('#yesBtn');
                const noButton = document.querySelector('#noBtn');


                if (yesButton && noButton && modal) {
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
        <div class="modal-content bg-white rounded-lg shadow-md p-6 w-96">
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
        this.restaurantModalDiv?.classList.add('hidden');
    }
    undoBlur(): void {
        if (this.confirmationDiv) {
            this.restaurantModalDiv?.classList.remove('hidden');
            this.confirmationDiv.innerHTML='';       
        }
    }

}