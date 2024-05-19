import { Page } from "../page.js";
import { Login } from "../introduction/login.js";
import { RoomModel } from "./models/Room.js";
import { Welness } from "./models/Welness.js";
import { Koktel } from "./models/Koktel.js";
import { Restaurant } from "./models/Restaurant.js";
import { ActiveRoom } from "./models/activeRoom.js";



export class OffersPage extends Page {

    roomsTypesData: ActiveRoom[] | undefined
    rooms: RoomModel[] | undefined
    welnessData: Welness[] | undefined
    restaurantData: Restaurant[] | undefined
    koktelData: Koktel[] | undefined
    constructor() {
        super('/src/pages/offers/offers.html')
    }

    override getHtmlCallback(){
        this.login()
        this.getRoomTypes()
        this.getRooms()
        this.getWelness()
        this.getRestaurant()
        this.getKoktel()
    }

    getRoomTypes(){
            const url: string = "https://hms.jedlik.cloud/api/rooms/types?onlyActives=true";
            const method: string = "GET";
            this.fetch<RoomModel[]>(url, method).then(
                result => {
                    this.rooms = result;
                    console.log("rooms:")
                    console.log(this.rooms)
                    
                    const src = "https://www.lakaskultura.hu/wp-content/uploads/2022/06/shutterstock_1458577289-e1654604786271.jpg"
                    let maxCapacity = 0;
                    let min = this.rooms[0].pricePerNigthPerPerson
                    this.rooms.forEach(element => {
                        if (element.capacity)
                        maxCapacity += element.capacity
                        if (element.pricePerNigthPerPerson && min)
                        if (element.pricePerNigthPerPerson < min){
                            min = element.pricePerNigthPerPerson
                        }
                    });
                    const list = `<li>Elérhető szobáink száma: ${this.rooms.length}</li><li>Akár ${min}$/fő/éj</li><li>Jelenlegi kapacitásunk ${maxCapacity} fő</li>`
                    console.log(list)
                    this.createBanner("Szobáink", src, "szoba", "?page=szobak", list)
                    }
    }

    getRooms(){
        const url: string = "https://hms.jedlik.cloud/api/rooms?onlyActives=true";
        const method: string = "GET";
        this.fetch<ActiveRoom[]>(url, method).then(
            result => {
                this.roomsTypesData = result;
                console.log("rooms:")
                console.log(this.roomsTypesData)

                const src = "https://classicahotel.hu/Application/Galeria/Szoba-113-114-115/galeria/114-DSC-5409.jpg"
                let maxrommnumber = this.roomsTypesData[0].roomNumber;
                this.roomsTypesData.forEach(element => {
                    if (element.roomNumber && maxrommnumber)
                    if (element.roomNumber > maxrommnumber){
                        maxrommnumber = element.roomNumber
                    }
                });
                if (maxrommnumber) {
                    const maxIntRoom = parseInt(maxrommnumber);
                    const list = `<li>Ennyi féle szoba érhető el: ${this.roomsTypesData.length}</li>
                                  <li>A hotel legmagasabb szobája a ${(Math.round(maxIntRoom/100)).toString()}. emeleten van</li>
                                  <li>A szobafoglalás azonnal online megtehető</li>`;
                    console.log(list)
                    this.createBanner("Foglalj most!", src, "foglalas", "?page=szobak", list)
                }
                
            }
        );
}

    getWelness(){
        const url: string = "https://hms.jedlik.cloud/api/wellness/categories";
        const method: string = "GET";
        this.fetch<Welness[]>(url, method).then(
            result => {
                this.welnessData = result;
                console.log("welness:")
                console.log(this.welnessData)

                const src = "https://www.termalfurdo.hu/images/cikk/1906/termalfurdo_top_10_wellness_hotelspirit_1.jpg"
                const list = `<li>${this.welnessData[0].name}</li>
                <li>${this.welnessData[1].name}</li>
                <li>${this.welnessData[2].name}</li>
                <li>És még több...</li>`;
                this.createBanner("Wellness", src, "Wellness", "?page=wellness", list)

            }
        );
    }

    getRestaurant(){
        const url: string = "https://hms.jedlik.cloud/api/restaurant/categories";
        const method: string = "GET";
        this.fetch<Restaurant[]>(url, method).then(
            result => {
                this.restaurantData = result;
                console.log("restaurant")
                console.log(this.restaurantData)
                const src = "https://welovebudapest.com/i/17/skybar-st-andrea.jpg"
                const list = `<li>${this.restaurantData[0].name}</li>
                                  <li>${this.restaurantData[1].name}</li>
                                  <li>${this.restaurantData[2].name}</li>
                                  <li>És még több...</li>`;
                this.createBanner("Éttermünk", src, "étterem", "?page=etterem", list)

            }
        );
    }

    getKoktel(){
        const url: string = "https://hms.jedlik.cloud/api/coctailbar/categories";
        const method: string = "GET";
        this.fetch<Koktel[]>(url, method).then(
            result => {
                this.koktelData = result;
                console.log("koktel")
                console.log(this.koktelData)

                const src = "https://colore.hu/wp-content/uploads/2023/02/koktelbar_budapest_1_S.jpg"
                const list = `<li>${this.koktelData[0].name}</li>
                                  <li>${this.koktelData[1].name}</li>
                                  <li>${this.koktelData[2].name}</li>
                                  <li>És még több...</li>`;
                this.createBanner("Koktél bár", src, "koktelbar", "?page=koktelbar", list)
            }
        );
    }

    login(){
        const url: string = "https://hms.jedlik.cloud/api/login"
        const method: string = "POST"
        const body: any= {
            loginName: "admin",
            password: "admin"
         }
        const data = this.fetch<Login>(url, method, body)
        data.then( (result) => {
            localStorage.setItem('user', JSON.stringify(result));
        })
    }
    
    createBanner(title: string, src: string, alt: string, href: string, list: string){
        const bannerMain = this.querySelector<HTMLElement>("#banner-main")
        bannerMain.innerHTML += `<div class="box-border lg:w-2/7 md:w-5/12 p-4 border-4 mt-11">
        <h2 class="text-lg font-bold text-center xl:mb-6 sm:mb-3">${title}</h2>
        <div class="flex md:flex-col xl:flex-row">
            <img  class="mx-auto lg:order-last box-border h-1/2 w-1/2" src="${src}" alt="${alt}" onclick="window.open('${href}')"">
            <ul class="list-disc mx-10">
                ${list}
            </ul>
        </div>
    </div>`
    }
}