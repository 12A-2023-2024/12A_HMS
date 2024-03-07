import { ContactPage } from "./pages/contact/contact.js";
import { GalleryPage } from "./pages/gallery/gallery.js";
import { HomePage } from "./pages/home/home.js";
import { IntroductionPage } from "./pages/introduction/introduction.js";

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
    'gallery': {
        page: GalleryPage
    }
}