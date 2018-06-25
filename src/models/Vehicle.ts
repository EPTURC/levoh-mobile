import { GeoCoordinate } from './GeoCoordinate';

export class Vehicle{
    public id: Number;
    public company: String;
    // TODO: Use some smarter data type, a Ordered Set for example 
    public locationHistory: GeoCoordinate[] = [];

    get lastLocation(): GeoCoordinate {
        if (!this.locationHistory.length) return null;
        return this.locationHistory[this.locationHistory.length - 1]
    }

    decodeJson(json: any) {
        this.id = json.id || 0;
        this.company = json.company_id || '';
        this.locationHistory = (json.locations || json.last_location ? [json.last_location] : [])
        .map((jsonLocation) => {
            var loc = new GeoCoordinate();
            loc.decodeJson(jsonLocation);
            return loc;
        }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    encodeJson(): any {
        return {
            id: this.id,
            company_id: this.company,
            location: this.locationHistory.map(c => c.encodeJson)
        }
    }
}