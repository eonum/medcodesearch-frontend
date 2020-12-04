/**
 * Contains configuration parameters for a {@link Catalog}.
 */
export class CatalogConfiguration {

  /**
   * List of types which can be searched within a catalog.
   *
   * The types match the type part of the url within the
   * eonum API.
   * Example: '/de/drgs/V1.0/P056' -> 'drgs' is the type
   */
  public searchableTypes: string[];

  /**
   * The param of the eonum API which is used to retrieved
   * the list of versions supported by a catalog.
   *
   * Example: '/de/drgs/versions' -> 'drgs' is the versionParam
   */
  public versionParam: string;

  /**
   * Contains some information about the root element of the
   * catalog.
   * Contains information about its type and - if the code of
   * the root element is constant - its code.
   */
  public rootElement: { type: string, code?: string };
}


/**
 * Contains the configurations for all catalogs, grouped by
 * catalog name.
 */
export const catalogConfigurations: { [name: string]: CatalogConfiguration } = {

  'ICD': {
    searchableTypes: ['icds'],
    versionParam: 'icds',
    rootElement: { type: 'icd_chapters' }
  },
  'CHOP': {
    searchableTypes: ['chops'],
    versionParam: 'chops',
    rootElement: { type: 'chop_chapters' }
  },
  'SwissDRG': {
    searchableTypes: ['drgs'],
    versionParam: 'drgs',
    rootElement: { type: 'mdcs', code: 'ALL' }
  },
  'TARMED': {
    searchableTypes: ['tarmeds'],
    versionParam: 'tarmeds',
    rootElement: { type: 'tarmed_chapters' }
  }

};
