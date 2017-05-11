# Testkonzept Projekt eonum

## Unit Tests

Unit-Tests werden automatisiert mittels des *Karma*-Testrunners für Angular 2 durchgeführt. Folgende Units werden dabei jeweils isoliert getestet:

- sämtliche **Service-Klassen**
- sämtliche **Catalog-Klassen**
- sämtliche **Helper-Klassen**
- sämtliche **Pipe-Klassen**

Zugriffe auf die *eonum-API* werden dabei mithilfe von Mock-Objekten simuliert, da ein Zugriff auf die echte API die Tests erheblich verlangsamen würde.

Sämtliche Dependencies in Unit-Tests werden mittels geeigneter Fake-Klassen oder mithilfe der Mocking-Library *TypeMoq* simuliert.

## Datenbank Tests

In diesem Projekt wird keine Datenbank verwendet. Es wird ausschliesslich auf die *eonum-API* zugegriffen. Diese API zu testen liegt in der Verantwortung von *eonum*. Falls aber von unserer Seite her Fehler in der API festgestellt werden, können wir diese an *eonum* melden. In der Regel werden diese Fehler zeitnah beseitigt.

## Integrationstests

Auf Integrations-Tests wird verzichtet, da der grösste Teil der Business-Logik sich gekapselt in den Services befindet und die Angular-Komponenten allesamt sehr schlank sind. Der Aufwand wäre unverhältnismässig.

Das Testing der User Stories wird durch die Usability-Tests abgedeckt. Die Stories sind im Dokument `srs_eonum.md` definiert.

## Installationstests

Die Applikation wird am Ende jeder Iteration auf eine Github-Page publiziert. So kann überprüft werden, dass die Installation funktioniert. Ausserdem wird die Installation auf verschiedenen Server-Umgebungen (Apache, nginx) durchgeführt, um die entsprechende Konfiguration zu testen.

## GUI Tests

GUI-Tests werden manuell durchgeführt.

## Usability Tests

Die künftigen Benutzer der Software werden primär medizinisches Personal (Ärzte, Spitalpersonal) und sonstige interessierten fachkundigen Personen sein. Die Benutzer verfügen in der Regel über eine medizinische Ausbildung oder zumindest medizinische Kenntnisse. Erklärungen zu den in der Applikation verwendeten medizinischen Fachbegriffe sind deshalb nicht notwendig.

Usability-Tests werden mithilfe von Kodierern und anderem medizinischen Personal durchgeführt. Dabei werden vorgängig einige Szenarien entworfen (z.B. "Suchen Sie im neuesten CHOP-Katalog nach dem Begriff 'Blinddarmentzündung'"), welche die Probanden dann durchspielen müssen. Resultate und Erkenntnisse aus den Tests werden schriftlich festgehalten und allfällige Verbesserungen so rasch wie möglich in die Applikation eingearbeitet.