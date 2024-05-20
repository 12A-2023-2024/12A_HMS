export class RoomModel {
    id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    pricePerNigthPerPerson: number | undefined;
    capacity: number | undefined;
    active: boolean | undefined;
    images: ImageModel[] | undefined;
    parameters: ParameterModel[] | undefined;
}

export class ImageModel {
    id: number | undefined;
    imageUrl: string | undefined;
}

export class ParameterModel {
    id: number | undefined;
    name: string | undefined;
}