import { Highlight } from "./Highlight";

export abstract class CatalogElement {
    code: string;
    text: string;
    highlight?: Highlight;
    version?: string;
    url: string;
}