import { Highlight } from "./Highlight";

/**
 * Class representing an element within a catalog.
 * Contains information about medical treatments and
 * diagnosis.
 */
export abstract class CatalogElement {
  code: string;
  text: string;
  highlight?: Highlight;
  version?: string;
  url: string;
  parent?: CatalogElement;
  children?: CatalogElement[];
}
