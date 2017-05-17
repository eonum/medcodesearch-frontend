# Architektur Favorite System

![](./HtmlArchitecture.png)


In diesem Dokument ist die Benutzerinteraktion dokumentiert.

Die `MainComponent` dient als Container für die `SearchFormComponent` und `SearchResultsComponent`


Die `SearchFormComponent` behandelt den Input des Benutzers (auswählen des Kataloges, Eingabe des Suchbegriffes, usw.)

Die `SearchResultsComponent` behandlet das anzeigen der Resultate der suche.


Die `DetailComponente` dient zur detaillierten Anzeige eines Codes. Die `DetailChopComponente`, `DetailIcdComponente` , `DetailSwissDrgComponente` dienen zur anzeige von Katalog spezifischen daten eines Codes. 

Ob die `DetailComponente` benutzt wird oder nicht wird vom `app-routing.module` bestimmt.

