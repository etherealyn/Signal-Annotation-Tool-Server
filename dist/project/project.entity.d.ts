import { ObjectID } from 'typeorm';
export declare class Project {
    id: ObjectID;
    title: string;
    description: string;
    modified: Date;
}
