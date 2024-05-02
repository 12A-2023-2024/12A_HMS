import { ContactPage } from "./pages/contact/contact.js";
import { HomePage } from "./pages/home/home.js";
import { IntroductionPage } from "./pages/introduction/introduction.js";
import { RoomtypeAdminPage } from "./pages/rooms/roomtype_admin.js";
import { RoomsAdminPage } from "./pages/rooms/rooms_admin.js";

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
    'roomtype_admin': {
        page: RoomtypeAdminPage
    },
    'rooms_admin': {
        page: RoomsAdminPage
    }
}