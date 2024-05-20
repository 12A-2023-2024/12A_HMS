import { Roomtype } from "./roomtype";

export class Room{
    roomNumber: string;
    roomTypeId: Number;

    constructor(roomNumber: string, roomTypeId: Number) {
        this.roomNumber = roomNumber;
        this.roomTypeId = roomTypeId;
    }
}