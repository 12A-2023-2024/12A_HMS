import { ContactPage } from "./pages/contact/contact.js";
import { HomePage } from "./pages/home/home.js";
import { IntroductionPage } from "./pages/introduction/introduction.js";
import { OffersPage } from "./pages/offers/offers.js";
import { IntroductionAdminPage } from "./pages/introduction/introductionAdmin/introductoinAdmin.js";
import { GalleryPage } from "./pages/gallery/gallery.js";

export const routes: {[key: string]: {page: any}} = {
    '': {
        page: HomePage
    },
    'introduction': {
        page: IntroductionPage
    },
    'introductionAdmin': {
        page: IntroductionAdminPage
    },
    'contact': {
        page: ContactPage
    },
    'offers': {
        page: OffersPage
    },
    'gallery': {
        page: GalleryPage
    }
}