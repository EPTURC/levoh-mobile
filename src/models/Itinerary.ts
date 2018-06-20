import { Vehicle } from "./vehicle";
import { ItineraryItem } from "./ItineraryItem";

export class Itinerary{

    public id:Number;
    public vehicle_id: Number;
    public driver_id: Number;
    public status: String;
    public vehicle: Vehicle;
    public items: ItineraryItem[];

    constructor(){}
}