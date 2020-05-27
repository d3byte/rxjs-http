import { HttpClient } from './client';
import { ConfigurationInterface } from './interfaces/configuration.interface';

export function http(configuration: ConfigurationInterface): HttpClient {
    return new HttpClient(configuration);
}
