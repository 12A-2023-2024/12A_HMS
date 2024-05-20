import { Page } from "../page";
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

  constructor(
    name: String,
    address: String,
    city: String,
    post_code: number,
    citizens: String,
    dateofbirth: String,
    placeofbirth: String,
    passport: String,
  ) {
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
  static async login() {
    const url = 'https://hms.jedlik.cloud/api/login';
    let token = JSON.stringify(await API.fetch(url, 'POST', {loginName: "admin", password: "admin"}));
    sessionStorage.setItem("authToken", token);

    return token;
  }

  static async getReservations() {
    let url = "https://hms.jedlik.cloud/api/reservations/list";
    let method = "GET";

    return await API.fetch(url, method);
  }

  static async checkin(number: number) {
    let url = "https://hms.jedlik.cloud/api/publicpages/checkin/" + number;
    let method = "POST";

    return await API.fetch(url, method);
  }

  static async reserveRoom(
    roomnumber: number,
    fromdate: String,
    todate: String,
    guests: Guest[],
  ) {
    let url = "https://hms.jedlik.cloud/api/publicpages/reserveroom";
    let method = "POST";

    return await API.fetch(
      url,
      method,
      JSON.stringify({
        roomnumber,
        fromdate,
        todate,
        guests,
      }),
    );
  }

  static async queryRooms(
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

    return API.fetch(url, method);
  }

  static async fetch<T>(url: string, method: string, body: any = null): Promise<T> {
    const userInfo = localStorage.getItem('user');
    let token = '';
    if (userInfo) {
        token = JSON.parse(userInfo).token;
    }

    const requestOptions: RequestInit = {
        method: method,
        redirect: 'follow',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: body ? JSON.stringify(body) : null
    };

    return fetch(url, requestOptions)
        .then((response) => {
            if (response.status == 200) {
                return response.text();
            } else if (response.status == 500) {
                throw response;
            } else {
                throw new Error(`Hiba a back-end hívás során (ErrorCode: ${response.status})`)
            }
        })
        .then((data) => {
            if (data) {
                return JSON.parse(data) as T
            }
            return null as T;
        })
}

}
