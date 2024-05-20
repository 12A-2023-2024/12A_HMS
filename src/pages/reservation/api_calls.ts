import { ReservationPage } from "./reservation";

export class Guest {
  name: String;
  address: String;
  city: String;
  postalcode: number;
  citizenship: String;
  dateofbirth: String;
  placeofbirth: String;
  passportnumber: String;

  constructor(name: String, address: String, city: String, post_code: number, citizens: String, dateofbirth: String, placeofbirth: String, passport: String) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.postalcode = post_code;
    this.citizenship = citizens;
    this.dateofbirth = dateofbirth;
    this.placeofbirth = placeofbirth;
    this.passportnumber = passport;
  }
}

export class API {
  private parent: ReservationPage;
  constructor(page: ReservationPage) {
    this.parent = page;
  }

  async getReservations() {
    let url = "https://hms.jedlik.cloud/api/reservations/list";
    let method = "GET";

    return await this.parent.fetch(url, method);
  }

  async checkin(number: number) {
    let url = "https://hms.jedlik.cloud/api/publicpages/checkin/" + number;
    let method = "POST";

    return await this.parent.fetch(url, method);
  }

  async reserveRoom(roomnumber: number, fromdate: String, todate: String, guests: Guest[]) {
    let url = "https://hms.jedlik.cloud/api/publicpages/reserveroom";
    let method = "POST";

    return await this.parent.fetch(url, method, JSON.stringify({
      roomnumber, fromdate, todate, guests
    }));
  }

  async queryRooms(
    floor: number | null = null,
    fromPrice: number | null = null,
    toPrice: number | null = null,
    capacity: number | null = null,
    parameters: string | null = null,
    fromDate: string | null = null,
    toDate: string | null = null,
  ) {
    const params = {
      floor: floor,
      fromPrice: fromPrice,
      toPrice: toPrice,
      capacity: capacity,
      parameters: parameters,
      fromDate: fromDate,
      toDate: toDate,
    };
    const url =
      "https://hms.jedlik.cloud/api/publicpages/findrooms?" +
      JSON.stringify(params);
    const method = "GET";

    return await this.parent.fetch(url, method);
  }
}
