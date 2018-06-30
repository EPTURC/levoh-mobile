import { Vehicle } from "./Vehicle";
import { Driver } from "./Driver";
import { Task } from "./Task";

export enum ItineraryStatus {
    Active = 'ativo',
    Inactive = 'inativo',
}

export class ItineraryItem {
    assign(other: ItineraryItem) {
        this.id = other.id;
        this.index = other.index;
        this.done = other.done;
        this.task.assign(other.task);
        this._itinerary = other._itinerary;
    }
    public id: number;
    public index: number;
    public done: boolean;
    public task = new Task();
    public get itinerary(): Itinerary {
        return this._itinerary;
    }

    public get status(): string {
        return this.done ? 'Concluído': 'Em andamento';
    }

    public set status(s: string) {
        if (s == 'Em andamento')
        this.done = false;

        if (s == 'Concluído')
        this.done = true;

        if (s == 'Pausado')
        this.done = false;
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

    /**
     * Add or refresh an item to itinerary
     * @param item The fresh item
     * @return Whether the Itinerary was refreshed
     */
    refreshItem(item: ItineraryItem): boolean {
        if (!item || !item.id || item.itinerary != this) {
            // This item is invalid or belongs to another itinerary
            return false;
        }
        let i = this.items.filter(i => i.id == item.id);
        if (!i) {
            this.items.push(item);
        } else {
            i[0].assign(item);
        }
        return true;
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