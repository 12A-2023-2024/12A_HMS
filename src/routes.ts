import { ContactPage } from "./pages/contact/contact.js";
import { HomePage } from "./pages/home/home.js";
import { IntroductionPage } from "./pages/introduction/introduction.js";
import { ReservationPage } from "./pages/reservation/reservation.js";

export const routes: { [key: string]: { page: any } } = {
    '': {
        page: HomePage
    },
    'introduction': {
        page: IntroductionPage
    },
    'contact': {
        page: ContactPage
    },
    'reservation': {
        page: ReservationPage
    }

}