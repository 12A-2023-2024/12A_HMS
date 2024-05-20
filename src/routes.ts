import { ContactPage } from "./pages/contact/contact.js";
import { HomePage } from "./pages/home/home.js";
import { IntroductionPage } from "./pages/introduction/introduction.js";
import { NewsPage } from "./pages/news/news.js";
import { NewsAdminPage } from "./pages/news/newsadmin.js";
import { OffersPage } from "./pages/offers/offers.js";
import { IntroductionAdminPage } from "./pages/introduction/introductionAdmin/introductoinAdmin.js";
import { GalleryPage } from "./pages/gallery/gallery.js";
import { GalleryAdminPage } from "./pages/gallery/admin/galleryAdmin.js";
import { ContactAdminPage } from "./pages/contact/admin/contactAdmin.js";
import { RestaurantStaffPage } from "./pages/restaurant/restaurantStaff.js";
import { RestaurantPublicPage } from "./pages/restaurant/restaurantPublic.js";
import { RestaurantAdminPage } from "./pages/restaurant/restaurantAdmin.js";
import { Login } from "./pages/login/login.js";

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
    'contactAdmin': {
        page: ContactAdminPage
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
    'offers': {
        page: OffersPage
    },
    'gallery': {
        page: GalleryPage
    },
    'restaurantPublic': {
        page: RestaurantPublicPage
    },
    'restaurantStaff': {
        page: RestaurantStaffPage
    },
    'restaurantAdmin': {
        page: RestaurantAdminPage
    },
    'login':{
        page:Login
    }
}

