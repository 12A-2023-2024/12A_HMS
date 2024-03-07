import { ContactPage } from "./pages/contact/contact.js";
import { HomePage } from "./pages/home/home.js";
import { IntroductionPage } from "./pages/introduction/introduction.js";
import { RestaurantStaffPage } from "./pages/restaurant/restaurantStaff.js";
import { RestaurantPage } from "./pages/restaurant/restaurant.js";

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
    'restaurant': {
        page: RestaurantPage
    },
    'restaurantStaff': {
        page: RestaurantStaffPage
    }

}