import { ContactPage } from "./pages/contact/contact.js";
import { HomePage } from "./pages/home/home.js";
import { IntroductionPage } from "./pages/introduction/introduction.js";
import { OffersPage } from "./pages/offers/offers.js";
import { IntroductionAdminPage } from "./pages/introduction/introductionAdmin/introductoinAdmin.js";
import { GalleryPage } from "./pages/gallery/gallery.js";
import { GalleryAdminPage } from "./pages/gallery/admin/galleryAdmin.js";

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
    'galleryAdmin': {
        page: GalleryAdminPage
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