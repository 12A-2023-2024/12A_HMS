
import { Page } from "../page.js";

export class WellnessAdminPage extends Page {

    constructor() {
        super('/src/pages/wellness/wellness_admin.html')
        this.getHtmlCallback();
    }

    override getHtmlCallback(){
    }

}