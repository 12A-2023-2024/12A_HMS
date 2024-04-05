import { Page } from "../page";

export class RoomsAdminPage extends Page {
    constructor() {
        super('/src/pages/rooms/rooms_admin.html');
    }
}

export const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});
