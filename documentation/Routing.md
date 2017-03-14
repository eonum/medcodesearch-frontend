# Routing

Momentaner stand der Dinge: 

Direktes Routing nach /:language/:catalog/:version zum `CatalogService`.  
Dort im Layout könnte man dann Suche und Catalog Auswahl anordnen.

**CatalogSelectComponent**
Für die Auswahl von Katalog un Version. Er verlinkt mit absoluten URLs 
zum CatalogComponent und kann so als HTML selector überall plaziert werden.

**CatalogComponent**
Component der als Wrapper für alles von einem Katalog gedacht ist, 
so dass man dort im Layout alles anordnen kann. Setzt durch das Routing 
wenn er geladen wird gleich den Katalog. Ung gibt ihn als Input dem SearchComponent. 

**SearchComponent**
Überall verwendbar als HTML selector, der Katalog sollte aber vorher schon gewählt sein.
Hat zurzeit neben dem Input Feld auch gleich noch die Suchresultate.

