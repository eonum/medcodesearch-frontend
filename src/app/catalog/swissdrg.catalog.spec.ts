import { async } from "@angular/core/testing";
import { SwissDrgCatalog } from "./swissdrg.catalog";
import { CatalogServiceMock } from "../service/catalog.service.mock";

describe("SwissDrgCatalog", () => {
    it('Should get a list of versions', async(() => {
        let catalog : SwissDrgCatalog = new SwissDrgCatalog(new CatalogServiceMock(null, null));
        catalog.getVersions().then(versions => {
            expect(versions.length).toBe(4);
        });
    }));

    it('Should return a list of results', async(() => {
        let catalog : SwissDrgCatalog = new SwissDrgCatalog(new CatalogServiceMock(null, null));
        catalog.search("V1.0", "Content").then(results => {
            expect(results.length).toBe(7);
        })
    }));

    it('Should return a single result by code', async(() => {
        let catalog : SwissDrgCatalog = new SwissDrgCatalog(new CatalogServiceMock(null, null));
        catalog.search("V1.0", "P234").then(results => {
            expect(results.length).toBe(1);
        })
    }));
    it('Should throw an error because no code found', async(() => {
        let catalog : SwissDrgCatalog = new SwissDrgCatalog(new CatalogServiceMock(null, null));
        catalog.search("V1.0", "P2345").then(result => { fail("Got unexpected result") }).catch(reason => {})
    }));
});
