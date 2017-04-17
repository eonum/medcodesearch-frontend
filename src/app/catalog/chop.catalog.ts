import {Catalog} from './catalog';
import {Inject, Injectable} from '@angular/core';
import { ICatalogService } from '../service/i.catalog.service';
import { ILoggerService } from "../service/i.logger.service";

/**
 * Concrete implementation of catalog class for the CHOP catalog.
 */
@Injectable()
export class CHOPCatalog extends Catalog {

  constructor(@Inject('ICatalogService') service: ICatalogService, @Inject('ILoggerService') logger: ILoggerService) {
    super(service, logger, 'CHOP', {
      searchableTypes: ['chops'],
      retrievableTypes: ['chops', 'chop_chapters'],
      versionParam: 'chops',
      rootElementType: 'chop_chapters'
    });
  }
}
