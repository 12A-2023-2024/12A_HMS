import { SocialMediaItemModel } from "../contact/socialMediaItemModel.js"

export class ContactsModel {
    postalCode: string | undefined; //
    city: string | undefined; // 
    address: string | undefined; //
    taxNumber: string | undefined;
    email: string | undefined; //
    telephone: string | undefined; //
    socialmedias: Array<SocialMediaItemModel> | undefined;
}