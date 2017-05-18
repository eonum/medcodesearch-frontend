# Analytics documentation

MedCodeSearch sends analytics data to eonum in order to optimize the search algorithm. In this documentation is specified when MedCodeSearch sends this data and how.


### When does analytics data get sent?

When the user clicks on a code in the search results list.  
No data is sent when the user clicks on a subordinate or superior code or on a code in the list of remembered codes.


### How does analytics data get sent?

MedCodeSearch sends a http-request to eonum with the URL-Parameter:  
query=Input  
where Input is the search term

To be more precise, a request ist sent to the following URL    
https://search.eonum.ch/Language/Catalogue/Version/Code?show_detail=1&query=Input

Where "Language" is the language of the catalogue of the code 
"Catalogue" is the name of the catalogue of the code  
"Version" is the version of the catalogue of the code  
"Code" is the name of the code the user clicked on   
and "Input" ist der search term that was used.  


### How is the analytics feature implemented?

The function to send the analytics data is handled by two components:  
search-results.component.ts and catalog.service.ts 

When a code is clicked on the function openCode in the search-results component is activated. this calls the function sendAnalytics which calls the sendAnalytics function in the catalog.service. The catalog.service calls the function getSingleElementForTypeByCode which makes the actual http request.

It se important to know that the search-results component calls the sendAnalytics function of the catalog.service interface (that is i.catalog.service.ts).
