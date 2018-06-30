import { Driver } from "./Driver";
import { Vehicle } from "./Vehicle";
import { Itinerary } from "./Itinerary";

export class Session{

    private static driver = new Driver();
    private static vehicle = new Vehicle();
    private static itinerary = new Itinerary();
    


    private constructor(){}

    public static get userSession()
    {
        // Do you need arguments? Make it a regular method instead.
        return this.driver
    }

    public static getVehicle()
    {
        // Do you need arguments? Make it a regular method instead.
        return this.vehicle
    }

    public static setVechicle(v: Vehicle)
    {
        this.vehicle = v;
    }

    public static getDriver()
    {
        // Do you need arguments? Make it a regular method instead.
        return this.driver;
    }

    public static setDriver(d: Driver)
    {
        this.driver = d;
    }


    public static getItinerary()
    {
        // Do you need arguments? Make it a regular method instead.
        return this.itinerary || (this.itinerary = new Itinerary());
    }

    public static setItinerary(i: Itinerary)
    {
        this.itinerary = i;
    }

}