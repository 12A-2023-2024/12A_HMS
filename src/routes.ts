import { ContactPage } from "./pages/contact/contact.js";
import { HomePage } from "./pages/home/home.js";
import { IntroductionPage } from "./pages/introduction/introduction.js";
import { RestaurantStaffPage } from "./pages/restaurant/restaurantStaff.js";
import { RestaurantPublicPage } from "./pages/restaurant/restaurantPublic.js";
import { RestaurantAdminPage } from "./pages/restaurant/restaurantAdmin.js";

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
    'restaurantPublic': {
        page: RestaurantPublicPage
    },
    'restaurantStaff': {
        page: RestaurantStaffPage
    }

}
