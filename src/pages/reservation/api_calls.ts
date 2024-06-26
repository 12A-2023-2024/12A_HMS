export type Room = {
  id: number,
  roomNumber: string,
  roomType: {
    name: string,
    description: string,
    imageUrls: string[],
    parameters: string[]
  },
  capacity: number,
  pricePerNigthPerPerson: number
};

export class Guest {
  name: String;
  address: String;
  city: String;
  postalcode: String;
  citizenship: String;
  dateofbirth: String;
  placeofbirth: String;
  passportnumber: String;

  constructor(
    name: String,
    address: String,
    city: String,
    post_code: String,
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

  static async checkin(number: number) {
    let url = "https://hms.jedlik.cloud/api/publicpages/checkin/" + number;
    let method = "POST";

    return await API.fetch(url, method);
  }

  static async queryParameters() {
    let url = "https://hms.jedlik.cloud/api/publicpages/roomparameters"
    let method = "GET"

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
  ): Promise<Room[]> {
    let url =
      "https://hms.jedlik.cloud/api/publicpages/findrooms?" + 
      (floor? "floor=" + floor + '&': '') +
      (fromPrice? "fromPrice=" + fromPrice + '&': '') +
      (toPrice? "toPrice=" + toPrice + '&': '') +
      (capacity? "capacity=" + capacity + '&': '') +
      (parameters? "parameters=" + parameters + '&': '') +
      (fromDate? "fromDate=" + fromDate + '&': '') +
      (toDate? "toDate=" + toDate + '&': '' );

    const method = "GET";

    return API.fetch(url.slice(0, -1), method);
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
