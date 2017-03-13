import { ChopElement } from "../model/chop.element";

export interface IChopService {
    search(version: string, search: string) : Promise<ChopElement[]>;
    getVersions(): Promise<string[]>;
    getByCode(version: string, code: string): Promise<ChopElement>;
}