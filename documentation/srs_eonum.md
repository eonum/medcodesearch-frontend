v.0.1 Initial Version
Software Requirement Specification
==================================

## 1. Introduction
------------
### 1.1 Purpose
This SRS is for the use of the developers and the customer of the eonum MedCode search project (name TBC). The content declares the specification of the project which have to be uphold by the customer and the developers.
### 1.2 Stakeholders
This Software Project will be developed for eonum as a part of the lecture "Praktikum Software Engineering" at the University of Bern. It will be released under an Open Source Licence on Github.
### 1.3 Abbreviations
* CHOP: Swiss Surgery Classification
* DRG: Diagnosis-related-Groups
* ICD: International Classification of Diseases
* TBC: To be confirmed
* TBD: To be defined

### 1.4 Definitions

Status:

* Done/Closed: Implemented
* TODO: Planned for current implementation
* In Progress: Partially Implemented
* New: Not Implemented
* Rejected: Not planned anymore

Main actors

* User: Users querying the MedCode Search

### 1.5  Overview
Chapter 2 displays the customer specifications and wishes important for this project.
Chapter 3 is targeted to the developers and shows the specific requirements.
### 1.6 References

[Link to the Project description page on github](https://github.com/eonum/medcodelogic-frontend "Github PSE Project")
## 2. Overall description
-------------------
### 2.1 User Stories
The following section describes the user stories of the eonum MedCode search web application. This should provide a high-level overview about the main conceptual ideas and the functionalities included in the project.

1. Catalogue Selection
2. Free text search
3. (Part) Code search
4. Display search results
5. Display Detail Information of Code
6. Navigation in hierarchical Structure of Catalogue
7. Language Switch
8. Highlighting Search Term
9. Application Naming
10. Take over Codes / Remember Codes
11. Analytical Feedback about searched Codes

**TODO**: Add Full Text to User Stories

### 2.2 Use cases

#### 2.2.1 Catalogue Selection

|#1|Catalogue selection|
|---|---|
|**Priority**|HIGH|
|**Status**|DONE|
|**User Story**|#1|
|**Initiating Actor**|User|
|**Goal**|The user selects a catalogue and the version of the catalogue he wants to search|
|**Sucess Guarantee**|Selected catalogue and version is specified and stored for further queries|
|**Description**|<ol><li>The user opens the MedCode Search Web Application</li><li>A list of available catalogues is presented to the user</li><li>User selects the catalogue he wants to search</li><li>System retrieves available versions for the selected catalogue</li><li>A list of available versions of the selected catalogue is presented to the user</li><li>User selects the version of the catalogue he wants to search</li><li>System stores selected catalogue and version</li></ol>|
|**Preconditions**|There is at least one searchable catalogue|
|**Triggers**|<ol><li>User opens MedCode search web application</li><li>User wants to change his catalogue or version selection during an existing session</li></ol>|
|**Exceptions**|There is no available version of the selected catalogue|
|**Postconditions**||
|**Rules**|Default catalogue should be ICDS (newest version)|
|**Extensions**||

#### 2.2.2 Free Text search
|#2|Free Text Search|
|---|---|
|**Priority**|HIGH|
|**Status**|DONE|
|**User Story**|#2, #3, #4|
|**Initiating Actor**|User|
|**Goal**|The user can search for Codes which are relevant a specific search term|
|**Sucess Guarantee**|The result of the search query is displayed|
|**Description**|<ol><li>The user submits a search query</li><li>The system searches for Codes matching the search term or containing a synonym of the search term in the name or description of the code</li><li>Codes matching the search query are displayed</li></ol>|
|**Preconditions**|The user selected a catalogue and the version of the catalogue he wants to search|
|**Triggers**|A search query is submitted|
|**Exceptions**|<ol><li>There are no search results matching the query</li><li>The search query is too short</li><li>The search query contains illegal characters</li></ol>|
|**Postconditions**||
|**Rules**|TBC: Minimum length of search string, illegal Characters?|
|**Extensions**||

#### 2.2.3 (Part) Code Search

|#3|(Part) Code search|
|---|---|
|**Priority**|DONE|
|**Status**||
|**User Story**|#3|
|**Description**|API Endpoint for Code search will not be used, instead all requests should be made against the free text search endpoint|



#### 2.2.4 Display Detail Information of Code

|#5|Display Detail Information of Code|
|---|---|
|**Priority**|HIGH|
|**Status**|TODO|
|**User Story**|#5|
|**Initiating Actor**|User|
|**Goal**|All available detail information about a code should be displayed|
|**Sucess Guarantee**||
|**Description**|<ol><li>User submitted a search query</li><li>A list of search results is displayed</li><li>All search results contain detailed information about the codes</li></ol>|
|**Preconditions**|The user selected a catalogue and the version of the catalogue he wants to search|
|**Triggers**|User submitted a search query|
|**Exceptions**|Empty search result set|
|**Postconditions**||
|**Rules**||
|**Extensions**||

#### 2.2.4 Navigation in hierarchical Structure of Catalogue

|#6|Navigation in hierarchical Structure of Catalogue|
|---|---|
|**Priority**|MEDIUM|
|**Status**|TODO POC|
|**User Story**|#6|
|**Initiating Actor**|User|
|**Goal**|As a User I want to be able to navigate in the hierarchical structure of the codes|
|**Sucess Guarantee**||
|**Description**|<ol><li>User submitted a search query</li><li>A list of search results is displayed with their position in the code hierarchy</li><li>The User can freely navigate through the hierarchy and browse for other codes on different levels of the hierarchy</li><li>Whenever the User changes the hierarchy level the result set is updated to contain only codes on the current level of the hierarchy</li></ol>|
|**Preconditions**|The user selected a catalogue and the version of the catalogue he wants to search|
|**Triggers**|User submitted a search query|
|**Exceptions**|Empty search result set|
|**Postconditions**||
|**Rules**||
|**Extensions**||

#### 2.2.4 Language Switch

|#7|Language Switch|
|---|---|
|**Priority**|HIGH|
|**Status**|In Progress|
|**User Story**|#7|
|**Initiating Actor**|User|
|**Goal**|The user can switch between different UI languages|
|**Sucess Guarantee**|The UI language was changed to the selected language|
|**Description**|<ol><li>User selects UI language</li><li>System updates UI language to the selected language</li></ol>|
|**Preconditions**||
|**Triggers**|User toggles language switch|
|**Exceptions**||
|**Postconditions**||
|**Rules**||
|**Extensions**||

#### 2.2.4 Highlighting Search Term

|#8|Highlighting Search Term|
|---|---|
|**Priority**|HIGH|
|**Status**|TODO|
|**User Story**|#8|
|**Initiating Actor**|User|
|**Goal**|Search terms in the search result set should appear higlighted|
|**Sucess Guarantee**||
|**Description**|<ol><li>User submitted a search query</li><li>A list of search results is displayed</li><li>All occurences of search term in the search result set appear highlighted</li></ol>|
|**Preconditions**|The user selected a catalogue and the version of the catalogue he wants to search|
|**Triggers**|User submitted a search query|
|**Exceptions**|Empty search string, empty search result set|
|**Postconditions**||
|**Rules**||
|**Extensions**||


#### 2.2.4 Take over Codes / Remember Codes

|#10|Take over Codes / Remember Codes|
|---|---|
|**Priority**|TBD|
|**Status**||
|**User Story**|#10|
|**Initiating Actor**|User|
|**Goal**||
|**Sucess Guarantee**||
|**Description**|<ol><li></li></ol>|
|**Preconditions**||
|**Triggers**||
|**Exceptions**||
|**Postconditions**||
|**Rules**||
|**Extensions**||

#### 2.2.4 Analytical Feedback about searched Codes

|#11|Analytical Feedback about searched Codes|
|---|---|
|**Priority**|TBD|
|**Status**||
|**User Story**|#11|
|**Initiating Actor**|User|
|**Goal**||
|**Sucess Guarantee**||
|**Description**|<ol><li></li></ol>|
|**Preconditions**||
|**Triggers**||
|**Exceptions**||
|**Postconditions**||
|**Rules**||
|**Extensions**||


## 3. Specific requirements
---------------------
### 3.1 Functional requirements


#### 3.1.1 Cataloge Selection
| Title                              | Description                      | Status |
|:-----------------------------------|:---------------------------------|:---------|
|Users can select a Catalogue| **Expected**<br>A list of catalogues is presented to the User, the User selects one Catalogue. The system gets the list of available versions of the Catalogue and presents the selection to the user. The user selects the version of the previously selected catalogue he wants to search. The selected catalogue and version is stored and used for all further queries<br><br>**Constraints**<br>If no available version of the selected catalogue is returned, report an error<br><br>**Main Actor**<br>User                                     |DONE|
| Users can change Catalogue selection| **Expected**<br>After the user selected a Catalogue he needs to be able to change his selection of the catalogue.<br><br>**Constraints**<br><br><br>**Main Actor**<br>User                                     |DONE|

#### 3.1.2 Free Text Search
| Title                              | Description                      | Status |
|:-----------------------------------|:---------------------------------|:---------|
|Free Text Search| **Expected**<br>The user can search for Codes containing the search term or a synonym of the search term in the name or description<br><br>**Constraints**<br><li>If no Code matches the query, report an error</li><li>If the search term is too short, report an error</li><li>If the search term contains illegal characters, report an error</li><br><br>**Main Actor**<br>User                                     |DONE|
|More results| **Expected**<br>The user can load more search results <br><br>**Constraints**<br><li>TBD: Pagination necessary for smaller screens?</li><br><br>**Main Actor**<br>User                                     |TODO|
|Terminal Codes| **Expected**<br>Free Text Search should only search for terminal codes<br><br>**Constraints**<br><li>Only applicable in ICD and CHOP</li><br><br>**Main Actor**<br>User                                     |TODO|
|Live Search| **Expected**<br>While entering a search string a preliminary list of live results should be displayed<br><br>**Constraints**<br><li>TBD: Minimum length of String to start search</li><br><br>**Main Actor**<br>User                                     |TODO|

#### 3.1.3 Display Detail Information of Code
| Title                              | Description                      | Status |
|:-----------------------------------|:---------------------------------|:---------|
|Display Detail Info| **Expected**<br>All available Information about a code should be displayed<br><br>**Constraints**<br><br><br>**Main Actor**<br>User                                     |DONE|
|Detail Info of Hierarchy| **Expected**<br>Information about symptoms in codes on a higher level in the hierarchy, should be displayed in the detail info of terminal codes<br><br>**Constraints**<br><br><br>**Main Actor**<br>User                                     |DONE|---------------|:---------|

#### 3.1.4 Navigation in hierarchical Structure of Catalogue
| Title                              | Description                      | Status |
|:-----------------------------------|:---------------------------------|:---------|
|Display Hierarchy| **Expected**<br>When displaying a search result set the position in the hierarchy of the code should be displayed<br><br>**Constraints**<br><br><br>**Main Actor**<br>User                                     |TODO|
|Navigate Hierarchy| **Expected**<br>When the User navigates to another level of the hierarchy the search result set should be updated to contain all codes on the selected level of the hierarchy<br><br>**Constraints**<br><br><br>**Main Actor**<br>User                                     |TODO|---------------|:---------|

#### 3.1.5 Language Switch
| Title                              | Description                      | Status |
|:-----------------------------------|:---------------------------------|:---------|
|Language Switch| **Expected**<br>The user should be able to toggle the language of the UI<br><br>**Constraints**<br><br><br>**Main Actor**<br>User                                     |DONE|
|Default Language| **Expected**<br>The default language should be set according to the browser language<br><br>**Constraints**<br>If browser language is not English, German, French or Italian, set language to English<br><br>**Main Actor**<br>User                                     |TODO|
|Unavailable languages| **Expected**<br>If a catalogue is not available in all languages these language should be greyed out and appear non selectable<br><br>**Constraints**<br>If a catalogue is selected which is unavailable in the currently selected language, the User should be notified and asked to select one of the available languages<br><br>**Main Actor**<br>User                                     |TODO|

#### 3.1.6 Highlighting Search Term
| Title                              | Description                      | Status |
|:-----------------------------------|:---------------------------------|:---------|
|Highlight| **Expected**<br>Search terms and synonyms of the search term should appear highlighted in the result set<br><br>**Constraints**<br><br><br>**Main Actor**<br>User                                     |TODO|---------------|:---------|






### 3.2 Non-functional requirements
#### 3.2.1 Responsiveness
| Title                              | Description                      | Status |
|:-----------------------------------|:---------------------------------|:---------|
|Compatibility| **Expected**<br> The software should work with Google Chrome, InternetExplorer, Firefox and Safari<br><br>**Constraints**<br><br><br>**Main Actor**<br>User                    
| Pending|
Responsiveness| **Expected**<br> The software should either respond immediately or show that it is loding data<br><br>**Constraints**<br><br><br>**Main Actor**<br>User                    
| Pending|---------------|:---------|


#### 3.2.2 Usability
**TODO:** Insert usability reqirements here (e.g. usable without manual for users with domain knowledge in medical coding)

#### 3.2.3 Application Naming

<li>Domain should be available in Switzerland</li>
<li>Name should be distinguishable from existing alternatives</li>


#### 3.2.3 License
<li>Application should be released under an Open Source License (MIT License)</li>



# 4. Questions
------------
##### Meeting Minutes (Discussed Questions)
- no more open questions
