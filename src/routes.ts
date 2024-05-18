import { ContactPage } from "./pages/contact/contact.js";
import { HomePage } from "./pages/home/home.js";
import { IntroductionPage } from "./pages/introduction/introduction.js";
import { WellnessPage } from "./pages/wellness/wellness.js";
import { WellnessAdminPage } from "./pages/wellness/wellness_admin.js";

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
    'services':{
        page: WellnessPage
    },
    'servicesadmin':{
        page: WellnessAdminPage
    }

}