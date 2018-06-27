export class Driver {
    public id: number;
    public userId:number;
    public name:String;

    encodeJson(): any {
        let json: any = {
            user: {
                id: this.userId,
                name: this.name
            }
        }
        if (this.id > 0) {
            json.id = this.id;
        }
        return json;
    }

    decodeJson(json: any) {
        json = json || {};
        this.id = json.id || 0;
        this.userId = json.user && json.user.id || 0;
        this.name = json.user && json.user.name || '';
    }
    
}