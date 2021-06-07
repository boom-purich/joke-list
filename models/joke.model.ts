export class SearchJoke {
    limit?:number = 10;
    firstName?:string = "";
    lastName?:string = "";
    category?:Array<string> = [];
}

export class Copy {
    copy_text:string;
    class_name:string;
}