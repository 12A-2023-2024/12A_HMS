export interface Contact{
    postalCode: number,
    city: string,
    address: string,
    taxNumber: string,
    email: string,
    telephone: string,
    socialmedias: Array<SocialMedia>
}

interface SocialMedia{
    id: number,
    name: string,
    iconURL: string,
    socialUrl: string
}