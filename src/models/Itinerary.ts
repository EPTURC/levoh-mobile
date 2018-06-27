import { Vehicle } from "./Vehicle";
import { Driver } from "./Driver";
import { Task } from "./Task";

export enum ItineraryStatus {
    Active = 'ativo',
    Inactive = 'inativo',
}

export class ItineraryItem {
    public id: number;
    public index: number;
    public done: boolean;
    public task = new Task();
    public get itinerary(): Itinerary {
        return this._itinerary;
    }

    public get status() {
        return this.done ? 'Concluída': 'Em andamento';
    }
    
    constructor(private _itinerary: Itinerary) {}

    decodeJson(json: any) {
        this.id = json.id || 0;
        this.index = json.index || 0;
        this.done = !!json.done;
        this.task.decodeJson(json.task || {id: json.task_id});
    }

    encodeJson(): any {
        return {
            id: this.id,
            index: this.index,
            task: this.task.encodeJson(),
            done: this.done,
        };
    }
}

export class Itinerary {
    public id: number;
    public driver = new Driver();
    public status = ItineraryStatus.Inactive;
    public vehicle = new Vehicle();
    public items: ItineraryItem[] = [];

    public get isActive() : boolean {
        return this.status == ItineraryStatus.Active;
    }

    public get isInactive() : boolean {
        return this.status == ItineraryStatus.Inactive;
    }

    encodeJson(): any {
        return {
            id: this.id,
            driver: this.driver.encodeJson(),
            status: this.status == ItineraryStatus.Inactive ? 'inativo' : 'ativo',
            vehicle: this.vehicle.encodeJson(),
            items: this.items.map(i => i.encodeJson())
        }
    }

    decodeJson(json: any) {
        this.id = json.id || 0;
        this.status = json.status == 'ativo' ? ItineraryStatus.Active : ItineraryStatus.Inactive;
        this.vehicle.decodeJson(json.vehicle || {id: json.vehicle_id});
        this.driver.decodeJson(json.driver || {id: json.driver_id});
        this.items = (json.items || []).map((data) => {
            var it = new ItineraryItem(this);
            it.decodeJson(data);
            return it;
        });
    }
}