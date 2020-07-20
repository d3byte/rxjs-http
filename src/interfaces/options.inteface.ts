import { ObjectInterface } from './object.interface';
import { MethodsInterface } from './methods.interface';

export interface OptionsInterface {
    method: keyof MethodsInterface;
    body?: BodyInit | ObjectInterface;
    headers?: ObjectInterface;
}
