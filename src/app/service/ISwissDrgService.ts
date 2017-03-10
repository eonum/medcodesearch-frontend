import { SwissDrgElement } from "../catalog/SwissDrgElement";

export interface ISwissDrgService {
    search(version: string, search: string) : SwissDrgElement[];
    getVersions(): string[];
    getByCode(code: string): SwissDrgElement;
}