import { CocktailBar } from "./pages/cocktailbar/cocktailBar.js";
import { ContactPage } from "./pages/contact/contact.js";
import { HomePage } from "./pages/home/home.js";
import { IntroductionPage } from "./pages/introduction/introduction.js";
import { CocktailEdit } from "./pages/cocktailbar/cocktailEdit.js"
import { CocktailOrder } from "./pages/cocktailbar/cocktailOrder.js";

export const routes: {[key: string]: {page: any}} = {
    '': {
        page: HomePage
    },
    'introduction': {
        page: IntroductionPage
    },
    'contact': {
        page: ContactPage
    },
    'cocktailbar':{
        page: CocktailBar
    }, 
    'cocktailedit':{
        page: CocktailEdit
    },
    'cocktailOrder':{
        page: CocktailOrder
    }

}