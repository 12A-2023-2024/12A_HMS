export class Parameter {
    id? : Number;
    name : string;

    constructor(name : string, id? : Number){
        this.name = name;
        if (id) {
            this.id = id;
        }
    }
}