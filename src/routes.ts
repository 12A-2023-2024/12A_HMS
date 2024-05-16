import { ContactPage } from "./pages/contact/contact.js";
import { HomePage } from "./pages/home/home.js";
import { IntroductionPage } from "./pages/introduction/introduction.js";
import { NewsPage } from "./pages/news/news.js";
import { NewsAdminPage } from "./pages/news/newsadmin.js";

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
    'news':{
        page: NewsPage
    },
    'newsadmin':{
        page: NewsAdminPage
    },

}