import { Roomtype } from "./roomtype";

export class Room{
    id? : Number;
    roomNumber: string;
    roomTypeId: Number;

    constructor(roomNumber: string, roomTypeId: Number, id? : Number) {
        this.roomNumber = roomNumber;
        this.roomTypeId = roomTypeId;
        this.id = id;
    }
}