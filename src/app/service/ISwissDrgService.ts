import { SwissDrgElement } from "../catalog/SwissDrgElement";

export interface ISwissDrgService {
    search(version: string, search: string) : Promise<SwissDrgElement[]>;
    getVersions(): Promise<string[]>;
    getByCode(version: string, code: string): Promise<SwissDrgElement>;
}