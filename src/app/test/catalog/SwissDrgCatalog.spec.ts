import { async } from "@angular/core/testing";
import { SwissDrgCatalog } from "../../catalog/SwissDrgCatalog";
import { SwissDrgServiceMock } from "../../service/SwissDrgServiceMock";
import { CatalogElement } from "../../catalog/CatalogElement";

describe("SwissDrgCatalog", () => {
    it('Should get a list of versions', async(() => {
        let catalog : SwissDrgCatalog = new SwissDrgCatalog(new SwissDrgServiceMock());
        let versions : string[] = catalog.getVersions();
        expect(versions.length).toBe(4);
    }));

    it('Should return a list of results', async(() => {
        let catalog : SwissDrgCatalog = new SwissDrgCatalog(new SwissDrgServiceMock());
        let results : CatalogElement[] = catalog.search("V1.0", "Content");
        expect(results.length).toBe(7);
    }));
});