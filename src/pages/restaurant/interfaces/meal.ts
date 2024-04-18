export interface IMeal{
    id:number,
    name:string,
    price:number,
    description:string,
    imageUrls: string[],
    categoryId: number,
    categoryName: string,
}