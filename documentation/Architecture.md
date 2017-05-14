# Architektur eonum search frontend

![](./CatalogArchitecture.png)

Die eonum-API kennt drei verschiedene Kataloge. Diese Kataloge weisen zahlreiche Gemeinsamkeiten auf, welche teilweise in eine Oberklasse `Catalog` ausgelagert werden können.

Da jeder Katalog auch einige Besonderheiten besitzt, wird jeder Katalog durch eine eigene Klasse modelliert (`SwissDrgCatalog`, `ChopCatalog` und `IcdCatalog`). Katalog-spezifisches Verhalten kann damit gekapselt werden.

Die Kataloge kommunizieren nicht direkt mit der eonum-API, da dies die Testbarkeit der Kataloge beeinträchtigen würde. Die eonum API wird von der Klasse `CatalogService` abgefragt, welche des Interface `ICatalogService` implementiert.

Zum Testen können beliebige Fake-Objekte, welche das `ICatalogService`-Interface implementieren, im Konstruktor an einen Katalog übergeben werden.

Die Klasse `CatalogElement` modelliert ein Objekt aus einem Katalog. `CatalogElement` enthält dabei alle Eigenschaften der Objekte, welche in allen Katalogen gleich sind.