import { Driver } from "./Driver";
import { Vehicle } from "./vehicle";
import { User } from "./User";
import { Itinerary } from "./Itinerary";

export class Session{

    private static user: User;
    private static driver: Driver;
    private static vehicle: Vehicle;
    private static itinerary: Itinerary;
    


    private constructor(){}

    public static get userSession()
    {
        // Do you need arguments? Make it a regular method instead.
        return this.user || (this.user = new User());
    }

    public static getVehicle()
    {
        // Do you need arguments? Make it a regular method instead.
        return this.vehicle || (this.vehicle = new Vehicle());
    }

    public static setVechicle(v: Vehicle)
    {
        this.vehicle = v;
    }

    public static getDriver()
    {
        // Do you need arguments? Make it a regular method instead.
        return this.driver || (this.driver = new Driver());
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