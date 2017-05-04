#Analytics Dokumentation

MedCodeSearch sendet Analytics Daten an eonum um den SuchAlgorithmus zu optimieren. In dieser Dokumentation wird spezifiziert wann diese Daten gesendet werden und wie.


###Wann werden Analytics Daten gesendet?

Wenn der Benutzer auf einen Code in der Resultatenliste klickt.  
Es werden kein Analytics Daten gesendet wenn der Benutzer einen unter- oder übergeordneten Code anklickt oder einen Code in der Liste der gemerkten Codes anklickt.


###Wie werden Analytics Daten gesendet?

MedCodeSearch sendet ein http-request an eonum mit dem URL-Parameter:  
query=Eingabe  
wobei Eingabe der verwendete Suchbegriff des Benutzers ist

um genauer zu sein wird ein http aufruf an die folgende URL durchgeführt:  
https://search.eonum.ch/Sprache/Katalog/Version/Code?show_detail=1&query=Eingabe

Wobei "Sprache" die Sprache des Katalogs des Codes ist  
"Katalog" der Name des Katalogs des Codes  
"Version" die Version des Katalogs des Codes ist  
"Code" der Name des geklickten Codes ist   
und "Eingabe" ist der Suchbegriff der verwendet wurde.  


###Wie ist das Analytics Feature implementiert?

Die Funktion zum senden der Analytics Daten wird von zwei Komponenten gehandhabt. Die komponente search-results.component.ts und catalog.service.ts 

Wenn auf ein Code geklickt wird dann wird die Funktion openCode in der search-results Komponente aktiviert. Diese ruft die Funktion sendAnalytics auf welche dann die sendAnalytics funktion im catalog.service aufruft. Der catalog.service ruft dann getSingleElementForTypeByCode auf welche den tatsächlichen http aufruf handhabt.

Es ist wichtig zu wissen dass die search-results Komponente die sendAnalytics funktion des catalog.service interfaces aufruft (i.catalog.service.ts).