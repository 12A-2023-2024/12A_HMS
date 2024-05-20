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
  static async static_fetch<T>(url: string, method: string, body: any = null): Promise<T> {
    const userInfo = localStorage.getItem('user');
    let token = '';
    if (userInfo) {
        token = JSON.parse(userInfo).token;
    }
    const requestOptions: RequestInit = {
        method: method,
        redirect: 'follow',
        mode: 'no-cors',
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

  static getReservations() {
    let url = "https://hms.jedlik.cloud/api/reservations/list";
    let method = "GET";

    return API.static_fetch(url, method).then((res) => {return res});
  }

  static checkin(number: number) {
    let url = "https://hms.jedlik.cloud/api/publicpages/checkin/" + number;
    let method = "POST";

    return API.static_fetch(url, method).then((res) => {return res});
  }

  static reserveRoom(
    roomnumber: number,
    fromdate: String,
    todate: String,
    guests: Guest[],
  ) {
    let url = "https://hms.jedlik.cloud/api/publicpages/reserveroom";
    let method = "POST";

    return API.static_fetch(
      url,
      method,
      JSON.stringify({
        roomnumber,
        fromdate,
        todate,
        guests,
      }),
    ).then((res) => {return res});
  }

  static queryRooms(
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

    return API.static_fetch(url, method).then((res) => {return res});
  }

  static login() {
    const url = 'https://hms.jedlik.cloud/api/login';
    API.static_fetch(url, 'POST', {login: "admin", password: "admin"})
        .then( (result) => {
            return JSON.stringify(result);
        })
        .catch( (error) => {
            console.log(error)
        })
  }
}
