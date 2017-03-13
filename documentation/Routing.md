# Componenten

**AppComponent**
Hier kommt nur die Auswahl der Sprache hin, im router-outlet wird der 
LanguageComponent für die ausgewählte Sprache angezeigt.

**LanguageComponent** (route e.g. /de)
Hat kein eigenes Layout. Das Routing über diesen Komponent setzt die 
Übersetzung die angewandt wird. Zeigt zurzeit den CatalogSelectcomponent 
im router-outlet an. 

**CatalogSelectComponent** (route e.g. /de)
Im Layout sollte ein Katalog mit Version ausgewählt werden könntn der dann auf 
den CatalogComponent verlinkt, bzw. wieder im Router-Outlet anzeigt.

**CatalogComponent** (route e.g. /de/drgs/V1.0/ )
Layout dient als Wrapper für den SearchComponent, später auch für KatalogNavigation.
Durch die Url wird beim erzeugen des Komponenten der richtige Catalog
ausgewählt und als Input an den SearchComponent weiter gibt.
 
**SearchComponent** 
Ist in den CatalogComponent integriert und beinhaltet zurzeit sowohl SuchFeld, 
wie auch Resultate. 
