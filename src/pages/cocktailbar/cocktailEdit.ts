import { Page } from "../page.js";

export class CocktailEdit extends Page {

    constructor() {
        super('/src/pages/cocktailbar/cocktailEdit.html');
        this.addEventListeners();
    }

    addEventListeners() {
        this.contentDiv?.querySelector('button#btnShowAddNew')?.addEventListener('click', () => {            
            document.querySelector('div#EditModal')?.classList.remove('hidden');
            document.querySelector('div#EditModal')?.classList.add('grid');
        });

        this.contentDiv?.querySelector('input#btnCancel')?.addEventListener('click', () => {
            document.querySelector('div#EditModal')?.classList.remove('grid');
            document.querySelector('div#EditModal')?.classList.add('hidden');
        });

        this.contentDiv?.querySelector('input#btnAddNew')?.addEventListener('click', () => {
            const name = this.contentDiv?.querySelector('#')
        });
    }
}