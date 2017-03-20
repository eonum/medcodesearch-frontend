import { async } from "@angular/core/testing";
import { SwissDrgCatalog } from "./swissdrg.catalog";
import * as TypeMoq from "typemoq";
import { ICatalogService } from "../service/i.catalog.service";
import { CatalogElement } from "../model/catalog.element";

describe("SwissDrgCatalog", () => {

    it('Should initialize service when retrieving versions', async(() => {
        const mock : TypeMoq.IMock<ICatalogService> = TypeMoq.Mock.ofType<ICatalogService>();
        mock.setup(x => x.init(
                            TypeMoq.It.isValue([ 'drgs', 'adrgs']), 
                            TypeMoq.It.isValue([ 'drgs', 'adrgs', 'partition', 'mdc' ]), 
                            TypeMoq.It.isValue('drgs'))
                    ).verifiable(TypeMoq.Times.once());

        const catalog : SwissDrgCatalog = new SwissDrgCatalog(mock.object);
        catalog.getVersions().then( versions => mock.verifyAll() );     
    }));

    it('Should initialize service when searching', async(() => {
        const mock : TypeMoq.IMock<ICatalogService> = TypeMoq.Mock.ofType<ICatalogService>();
        mock.setup(x => x.init(
                            TypeMoq.It.isValue([ 'drgs', 'adrgs']), 
                            TypeMoq.It.isValue([ 'drgs', 'adrgs', 'partition', 'mdc' ]), 
                            TypeMoq.It.isValue('drgs'))
                    ).verifiable(TypeMoq.Times.once());

        const catalog : SwissDrgCatalog = new SwissDrgCatalog(mock.object);
        catalog.search('V1.0', 'test').then(versions => {
            mock.verifyAll()
        });     
    }));

    it('Should get a list of versions', async(() => {
        const mock : TypeMoq.IMock<ICatalogService> = TypeMoq.Mock.ofType<ICatalogService>();
        mock.setup(x => x.getVersions()).returns(() => Promise.resolve([ "V1.0","V2.0","V3.0","V4.0" ]));

        const catalog : SwissDrgCatalog = new SwissDrgCatalog(mock.object);
        catalog.getVersions().then(versions => {
            expect(versions.length).toBe(4);
        });
    }));

    it('Should return a list of results', async(() => {
        const catalogs : CatalogElement[] = [
            { code: "Content 1", text: "Description content 1", url: "/url/to/content1" },
            { code: "Content 2", text: "Description content 2", url: "/url/to/content2" }
        ];

        const mock : TypeMoq.IMock<ICatalogService> = TypeMoq.Mock.ofType<ICatalogService>();
        mock.setup(x => x.search('V1.0', 'Content')).returns(() => Promise.resolve(catalogs));

        const catalog : SwissDrgCatalog = new SwissDrgCatalog(mock.object);
        catalog.search('V1.0', 'Content').then(results => {
            expect(results.length).toBe(2);
        });
    }));

    it('Should return a single result by code', async(() => {
        const mock : TypeMoq.IMock<ICatalogService> = TypeMoq.Mock.ofType<ICatalogService>();
        mock.setup(x => x.getByCode('V1.0', 'P20A')).returns(() => Promise.resolve({ code: "Content 1", text: "Description content 1", url: "/url/to/content1" }));

        const catalog : SwissDrgCatalog = new SwissDrgCatalog(mock.object);
        catalog.search('V1.0', 'P20A').then(results => {
            expect(results.length).toBe(1);
        });
    }));

    it('Should throw an error because no code found', async(() => {
        const mock : TypeMoq.IMock<ICatalogService> = TypeMoq.Mock.ofType<ICatalogService>();
        mock.setup(x => x.getByCode('V1.0', 'P23')).throws(new Error());

        const catalog : SwissDrgCatalog = new SwissDrgCatalog(mock.object);
        catalog.search('V1.0', 'P23')
            .then(result => {
                fail("Got unexpected result")
            })
            .catch(reason => {
                //Ok - should throw
            });
    }));
});
