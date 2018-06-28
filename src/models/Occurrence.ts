import { GeoCoordinate } from "./GeoCoordinate";
import { Driver } from "./Driver";


export class Occurrence{
    public id: number = 0;
    public type = '';
    public location = new GeoCoordinate();
    public description: string;
    public driver = new Driver();
    public createdAt = new Date();

    decodeJson(json: any) {
        this.id = json.id || 0;
        this.type = json.type || '';
        this.location.decodeJson(json.location);
        this.description = json.description || '';
        this.driver.decodeJson(json.driver || {id: json.driver_id});
        this.createdAt = json.created_at ? new Date(json.created_at) : new Date();
    }

    encodeJson(): any {
        let json: any = {
            type: this.type,
            location: `${this.location.latitude}, ${this.location.longitude}`,
            description: this.description,
            driver: this.driver.encodeJson()
        };
        if (this.id > 0) {
            json.id = this.id;
        }
        return json;
    }
}


