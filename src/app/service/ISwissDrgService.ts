import { SwissDrgElement } from "../model/swissdrg.element";

export interface ISwissDrgService {
    search(version: string, query: string) : Promise<SwissDrgElement[]>;
    getVersions(): Promise<string[]>;
    getByCode(version: string, code: string): Promise<SwissDrgElement>;
}