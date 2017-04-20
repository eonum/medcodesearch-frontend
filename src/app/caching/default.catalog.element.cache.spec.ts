import { CatalogElement } from '../model/catalog.element';
import { DefaultCatalogElementCache } from './default.catalog.element.cache';

describe('DefaultCatalogElementCache', () => {

    it('Should return no element on empty cache', () => {
        const cache = new DefaultCatalogElementCache();
        const result: CatalogElement = cache.getElement('de', 'drgs', 'V1.0', 'drgs', 'P34');
        expect(result).toBeNull;
    });

    it('Should return element if it exists in cache', () => {
        const cache = new DefaultCatalogElementCache();
        const elementToAdd = new CatalogElement();
        cache.addElement('de', 'drgs', 'V1.0', 'drgs', 'P34', elementToAdd);
        const result: CatalogElement = cache.getElement('de', 'drgs', 'V1.0', 'drgs', 'P34');
        expect(result).toBe(elementToAdd);
    });

    it('Should return multiple elements if they exist in cache', () => {
        const cache = new DefaultCatalogElementCache();
        
        const elementToAdd1 = new CatalogElement();
        cache.addElement('de', 'drgs', 'V1.0', 'drgs', 'P34', elementToAdd1);

        const elementToAdd2 = new CatalogElement();
        cache.addElement('fr', 'icd', 'icd-2016', 'icd_chapters', 'IV', elementToAdd2);

        const result1: CatalogElement = cache.getElement('de', 'drgs', 'V1.0', 'drgs', 'P34');
        expect(result1).toBe(elementToAdd1);

        const result2: CatalogElement = cache.getElement('fr', 'icd', 'icd-2016', 'icd_chapters', 'IV');
        expect(result2).toBe(elementToAdd2);
    });

    it('Should return correct elements for different languages but same code', () => {
        const cache = new DefaultCatalogElementCache();
        
        const elementToAdd1 = new CatalogElement();
        cache.addElement('de', 'drgs', 'V1.0', 'drgs', 'P34', elementToAdd1);

        const elementToAdd2 = new CatalogElement();
        cache.addElement('fr', 'drgs', 'V1.0', 'drgs', 'P34', elementToAdd2);

        const result1: CatalogElement = cache.getElement('de', 'drgs', 'V1.0', 'drgs', 'P34');
        expect(result1).toBe(elementToAdd1);

        const result2: CatalogElement = cache.getElement('fr', 'drgs', 'V1.0', 'drgs', 'P34');
        expect(result2).toBe(elementToAdd2);
    });

    it('Should throw Error if adding null', () => {
        const cache = new DefaultCatalogElementCache();
        expect(() => cache.addElement('de', 'drgs', 'V1.0', 'drgs', 'P34', null)).toThrowError();
    });

    it('Should not return element after clear of cache', () => {
        const cache = new DefaultCatalogElementCache();
        const elementToAdd = new CatalogElement();
        cache.addElement('de', 'drgs', 'V1.0', 'drgs', 'P34', elementToAdd);
        cache.clear();
        const result: CatalogElement = cache.getElement('de', 'drgs', 'V1.0', 'drgs', 'P34');
        expect(result).toBeNull;
    });

});