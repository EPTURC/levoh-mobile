import { GeoCoordinate } from "./GeoCoordinate";

export enum TaskType {
    Collect = 'Coleta',
    Delivery = 'Entrega'
}

export class Task{
    // The id of the task
    public id: number = 0;
    
    // The object to delivery
    public object: String = '';
    
    // The responsable for send or receive the delivery
    public responsableName: String = '';
    
    // ??
    public timeDuration: Number;

    // Collect or Delivery
    public type: TaskType;

    // Where the driver must go to fulfill this task
    public local = new GeoCoordinate();

    // The other end of the task, eather a collect or a delivery
    public relatedTask: Task = null;

    get isCollect(): boolean {
        return this.type == TaskType.Collect;
    }

    get isDelivery(): boolean {
        return this.type == TaskType.Delivery;
    }

    decodeJson(json: any) {
        this.id = json.id || 0;
        this.object = json.object || '';
        this.responsableName = json.responsible_name || '';
        this.type = json.type == 'Coleta' ? TaskType.Collect : TaskType.Delivery;
        this.local.decodeJson(json.local);
    }

    encodeJson(): any {
        return {
            id: this.id,
            object: this.object,
            responsible_name: this.responsableName,
            type: this.type.toString(),
            local: `${this.local.latitude}, ${this.local.longitude}`
        }
    }

    assign(other: Task) {
        this.id = other.id;
        this.object = other.object;
        this.responsableName = other.responsableName;
        this.timeDuration = other.timeDuration;
        this.type = other.type;
        this.local = other.local;
        this.relatedTask = other.relatedTask;
    }
}