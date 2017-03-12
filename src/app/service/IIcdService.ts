import { IcdElement } from "../model/icd.element";

export interface IIcdService {
    search(version: string, search: string) : Promise<IcdElement[]>;
    getVersions(): Promise<string[]>;
    getByCode(version: string, code: string): Promise<IcdElement>;
}