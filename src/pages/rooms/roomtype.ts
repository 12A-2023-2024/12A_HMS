import { RoomImage } from "./image.js";

export class Roomtype {
    id: Number;
    name: string;
    description: string;
    pricePerNightPerPerson: Number;
    capacity: Number;
    active: boolean;
    images: RoomImage[];
    parameters: Number[];

    constructor(name : string, description : string, pricePerNightPerPerson : Number, capacity : Number, images : RoomImage[], parameters : Number[])
    constructor(id : Number, name : string, description : string, pricePerNightPerPerson : Number, capacity : Number, active : boolean, images : RoomImage[], parameters : Number[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.pricePerNightPerPerson = pricePerNightPerPerson;
        this.capacity = capacity;
        this.active = active;
        this.images = images;
        this.parameters = parameters;
    }

}