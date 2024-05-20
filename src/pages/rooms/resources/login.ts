export async function login() : Promise<string>{

    const raw = JSON.stringify({
    "loginName": "admin",
    "password": "admin"
    });

    const requestOptions : RequestInit = {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: raw,
    redirect: "follow"
    };

    const token = fetch("https://hms.jedlik.cloud/api/login", requestOptions)
    .then((response) => response.json().then((data) => {
        return data.token;
    }))
    .then((result) => result)
    .catch((error) => console.error(error))

    return token;
}
