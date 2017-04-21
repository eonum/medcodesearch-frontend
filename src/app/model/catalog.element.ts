import { Highlight } from './Highlight';

/**
 * Class representing an element within a catalog.
 * Contains information about medical treatments and
 * diagnosis.
 */
export class CatalogElement {
  public name?: string;
  public code: string;
  public text: string;
  public type: string;
  public highlight?: Highlight;
  public version?: string;
  public url: string;
  public parent?: CatalogElement;
  public children?: CatalogElement[];
}
