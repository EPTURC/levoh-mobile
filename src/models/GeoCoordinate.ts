import { DateTime } from "ionic-angular/umd";
import { Geoposition } from "@ionic-native/geolocation";

export class GeoCoordinate {
    public id: number;

    decodeJson(json: any) {
        if (typeof json == 'string') {
            let parts = json.split(', ');
            this.latitude = parseFloat(parts[0]);
            this.longitude = parseFloat(parts[1]);
            return;
        }
        this.latitude = json.latitude || NaN;
        this.longitude = json.longitude || NaN;
        this.createdAt = json.created_at ? new Date(json.created_at) : new Date();
    }

    encodeJson(): any {
        return {
            latitude: this.latitude,
            longitude: this.longitude,
            created_at: this.createdAt.toISOString()
        };
    }

    readGeoPosition(geoposition: Geoposition) {
        this.latitude = geoposition.coords.latitude;
        this.longitude = geoposition.coords.longitude;
        this.createdAt = new Date(geoposition.timestamp);
    }

    constructor(
        public latitude: number = NaN,
        public longitude: number = NaN,
        public createdAt: Date = new Date()) {}
}