import { RoomImage } from "./image.js";

export class Roomtype {
    id?: Number;
    name: string;
    description: string;
    pricePerNightPerPerson: Number;
    capacity: Number;
    active?: boolean;
    images: RoomImage[];
    parameters: Number[];

    constructor(name : string, description : string, pricePerNightPerPerson : Number, capacity : Number, images : RoomImage[], parameters : Number[], id? : Number, active? : boolean) {
        if (id && active) {
            this.id = id;
            this.active = active;
        }
        this.name = name;
        this.description = description;
        this.pricePerNightPerPerson = pricePerNightPerPerson;
        this.capacity = capacity;
        this.images = images;
        this.parameters = parameters;
    }
}