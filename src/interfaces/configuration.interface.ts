import { ObjectInterface } from './object.interface';

export interface ConfigurationInterface {
    jwt?: string;
    baseUrl?: string;
    defaultHeaders?: ObjectInterface;
}
