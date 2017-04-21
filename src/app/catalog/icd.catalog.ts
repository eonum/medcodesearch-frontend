import { ICatalogService } from '../service/i.catalog.service';
import { ILoggerService } from '../service/logging/i.logger.service';
import { Catalog } from './catalog';
import { Inject, Injectable } from '@angular/core';
import { catalogConfigurations } from './catalog.configuration';

/**
 * Concrete implementation of catalog class for the ICD catalog.
 */
@Injectable()
export class ICDCatalog extends Catalog {

  constructor( @Inject('ICatalogService') service: ICatalogService, @Inject('ILoggerService') logger: ILoggerService) {
    super(service, logger, 'ICD', catalogConfigurations['ICD']);
  }
}
