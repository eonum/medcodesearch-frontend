v.0.4
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
|**Status**|DONE|
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
|**Status**|DONE|
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
|**Status**|DONE|
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
|**Status**|DONE|
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

#10|Take over Codes / Remember Codes|
|---|---|
|**Priority**|LOW|
|**Status**|DONE|
|**User Story**|#10|
|**Initiating Actor**|User|
|**Goal**|As a User I want to be able to remember codes so that I can quickly find them again later|
|**Sucess Guarantee**||
|**Description**|<ol><li>User stars a Code</li><li>The code is added to the list of remembered codes</li></ol>|
|**Preconditions**||
|**Triggers**|User stars a Code|
|**Exceptions**||
|**Postconditions**||
|**Rules**||
|**Extensions**||

#### 2.2.4 Analytical Feedback about searched Codes

|#11|Analytical Feedback about searched Codes|
|---|---|
|**Priority**|HIGH|
|**Status**|DONE|
|**User Story**|#11|
|**Initiating Actor**|User|
|**Goal**|As a System Administrator I want to get feedback about clicked search results to be able to improve the search algorithm|
|**Sucess Guarantee**||
|**Description**|<ol><li>The User submits a search query</li><li>A list of search results is displayed</li><li>User clicks a search result</li><li>Feedback about the clicked search result is sent to the system</li></ol>|
|**Preconditions**|User selected a catalogue|
|**Triggers**|User clicks a search result|
|**Exceptions**||
|**Postconditions**||
|**Rules**|only the first clicked result after a search query should be considered|
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
|Free Text Search| **Expected**<br>The user can search for Codes containing the search term or a synonym of the search term in the name or description<br><br>**Constraints**<br><li>If no Code matches the query, report an error</li><br><br>**Main Actor**<br>User                                     |DONE|
|Terminal Codes| **Expected**<br>Free Text Search should only search for terminal codes<br><br>**Constraints**<br><li>Only applicable in ICD and CHOP</li><br><br>**Main Actor**<br>User                                     |DONE|
|Live Search| **Expected**<br>While entering a search string a preliminary list of live results should be displayed<br><br>**Constraints**<br><br>**Main Actor**<br>User                                     |DONE|
|Display Root Element| **Expected**<br>When no search query is entered, the root element of the catalogue should be displayed<br><br>**Constraints**<br><br><br>**Main Actor**<br>System                                    |DONE|---------------|:---------|

#### 3.1.3 Display Detail Information of Code
| Title                              | Description                      | Status |
|:-----------------------------------|:---------------------------------|:---------|
|Display Detail Info| **Expected**<br>All available Information about a code should be displayed<br><br>**Constraints**<br><br><br>**Main Actor**<br>User                                     |DONE||---------------|:---------|

#### 3.1.4 Navigation in hierarchical Structure of Catalogue
| Title                              | Description                      | Status |
|:-----------------------------------|:---------------------------------|:---------|
|Display Hierarchy| **Expected**<br>When displaying a search result set the position in the hierarchy of the code should be displayed<br><br>**Constraints**<br><br><br>**Main Actor**<br>User                                     |DONE|
|Navigate Hierarchy| **Expected**<br>When the User navigates to another level of the hierarchy the search result set should be updated to contain all codes on the selected level of the hierarchy<br><br>**Constraints**<br><br><br>**Main Actor**<br>User                                     |DONE|
|Tooltip| **Expected**<br>When hovering an element of the hierarchical structure a tooltip containing the description of the element should appear<br><br>**Constraints**<br><br><br>**Main Actor**<br>System                                     |DONE|---------------|:---------|

#### 3.1.5 Language Switch
| Title                              | Description                      | Status |
|:-----------------------------------|:---------------------------------|:---------|
|Language Switch| **Expected**<br>The user should be able to toggle the language of the UI<br><br>**Constraints**<br><br><br>**Main Actor**<br>User                                     |DONE|
|Default Language| **Expected**<br>The default language should be set according to the browser language<br><br>**Constraints**<br>If browser language is not English, German, French or Italian, set language to Default<br><br>**Main Actor**<br>User                                     |DONE|
|Unavailable languages| **Expected**<br>If a catalogue is not available in all languages these language should be greyed out and appear non selectable<br><br>**Constraints**<br>If a catalogue is selected which is unavailable in the currently selected language, the User should be notified and asked to select one of the available languages<br><br>**Main Actor**<br>User                                     |DONE|

#### 3.1.6 Highlighting Search Term
| Title                              | Description                      | Status |
|:-----------------------------------|:---------------------------------|:---------|
|Highlight| **Expected**<br>Search terms and synonyms of the search term should appear highlighted in the result set<br><br>**Constraints**<br><br><br>**Main Actor**<br>User                                     |DONE|---------------|:---------|


#### 3.1.7 Analytical Feedback about searched Codes
| Title                              | Description                      | Status |
|:-----------------------------------|:---------------------------------|:---------|
|Analytics| **Expected**<br>After a search query feedback about clicked elements should be sent to the system. <br><br>**Constraints**<br><br>Only the first clicked element should be considered<br>**Main Actor**<br>System                                                                                       |DONE|---------------|:---------|





### 3.2 Non-functional requirements

| Title                              | Description                      | Status |
|:-----------------------------------|:---------------------------------|:---------|
|Compatibility| **Expected**<br> The software should work with Google Chrome, InternetExplorer, Firefox and Safari<br><br>**Constraints**<br><br><br>**Main Actor**<br>User|DONE|
|Responsiveness| **Expected**<br> The software should either respond immediately or show that it is loding data<br><br>**Constraints**<br><br><br>**Main Actor**<br>User|DONE|
|Customer satisfied| **Expected**<br> Our website design must satisfy our customer<br><br>**Constraints**<br><br><br>**Main Actor**<br>Customer|DONE|


#### 3.2.3 Application Naming

<li>Domain should be available in Switzerland</li>
<li>Name should be distinguishable from existing alternatives</li>


#### 3.2.3 License
<li>Application should be released under an Open Source License (MIT License)</li>

### 3.3 Usability Requirements
The following section lists the usability requirements used for measuring and evaluation the final usability of the application. Furthermore, those requirements were used to evaluate the usability testing tasks. For a full analysis, please see the Usability Report in the "documentation" folder. The requirements can be grouped according to ISO Standard 9241 to the following: 
1. Rating Scale: overall evaluation of satisfaction level and recommendation
2. Efficiency: Time to task fullfillment
3. Effectivity: Task success ratio and recoverability 

Each Usability requirement defines different fullfillment degrees. The following levels are defined: 
<li>Worst: The worst outcome that could happen </li>
<li>Acceptable: The level the application must at lest fullfill</li>
<li>Planned: The level the application should fullfill</li>
<li>Best Case: Best possible outcome</li>

The usability evaluation i.e. whether the application fullfills the usability requirements can be found in the final [usability report](https://github.com/eonum/medcodelogic-frontend/tree/master/documentation). 

#### 3.3.1 Rating Scale Usability Requirement
| #12                             | Overall Satisfaction                      |
|-----------------------------------|---------------------------------|
|**Measuring Concept** | Evaluates the overall satisfaction level with the application in average of all usability testing probes. |
|**Measuring Method** | 10 point scale with 10 = very satisfied and 0 = very unsatisfied |
| **Worst Case**| Score 0-6:  very unsatisfied to mildly satisfied with applicaton|
| **Acceptable** | Score 7: satisfied with application|
| **Planned**| Score 8: quite satisfied with application|
| **Best** | Score 9-10: very satisfied |

| #13                             | Recommendation                      |
|-----------------------------------|---------------------------------|
|**Measuring Concept** | How likely is it, that the test persons would recommend the application to other people (coders). Also used as a base for measuring the NPS (Net Promoter Score) |
|**Measuring Method** | 10 point scale with 10 = definitely recommend and 0 = definitly not recommendable |
| **Worst Case**| Score 0-6:  unlikely to recommend|
| **Acceptable** | Score 7: likely to recommend|
| **Planned**| Score 8: quite likely to recommend|
| **Best** | Score 9-10: definitely recommend |

#### 3.3.2 Efficiency Usability Requirement
| #14                             | Time for Search using Search Term                   |
|-----------------------------------|---------------------------------|
|**Measuring Concept** | Time (mm:ss) it takes to search for a DRG using the search entry field and input of a search term |
|**Measuring Method** | 9 Point scale from 00:00 min up to 03:30 min with intervals of 00:30s |
| **Worst Case**| Score +03:30 to 01:30 min:  Takes too long to find the Code|
| **Acceptable** | Score 01:00 to 01:30 min: Time it takes to find the Code is acceptable.|
| **Planned**| Score 00:30 min to 01:00 min: good structure and highlighting of the searchterm in the results list allows to find the code fast. |
| **Best** | Score 00:00 min to 00:30 min: The code can be found very fast.  |


| #15                           | Time to remember code                |
|-----------------------------------|---------------------------------|
|**Measuring Concept** | Time (mm:ss) it takes to find the remember code feature and add a code to the remember list.  |
|**Measuring Method** | 9 Point scale from 00:00 min up to 03:30 min with intervals of 00:30s |
| **Worst Case**| Score +03:30 to 01:30 min:  Takes too long to find the feature/add the code|
| **Acceptable** | Score 01:00 to 01:30 min: Time it takes to find the feature/code are within limits and might improve as soon as you know where the feature is|
| **Planned**| Score 00:30 min to 01:00 min: Correct labels and visible positioning of the feature allows the user to find it fast |
| **Best** | Score 00:00 min to 00:30 min: The feature can be found very easily and fast. Elements can be added within seconds.  |

| #16                           | Time to find code details           |
|-----------------------------------|---------------------------------|
|**Measuring Concept** | Time (mm:ss) it takes to find a specific code, click on it and open the detail page. On the detail page the requested information e.g. symptoms should be found easily.  |
|**Measuring Method** | 9 Point scale from 00:00 min up to 03:30 min with intervals of 00:30s |
| **Worst Case**| Score +03:30 to 01:30 min:  Detail information about a code cannot be found fast or are not visible enough. The user will likely switch to another application.|
| **Acceptable** | Score 01:00 to 01:30 min: it takes a bit of searching time, but the detail information can be found within a reasonable time. |
| **Planned**| Score 00:30 min to 01:00 min: The detail page is found fast and the page is well structured to find specific information easily |
| **Best** | Score 00:00 min to 00:30 min: Codes can be found very fast and detail informations are visible at first glance  |

| #17                          | Time to search using navigational hierarchy          |
|-----------------------------------|---------------------------------|
|**Measuring Concept** | Time (mm:ss) it takes to find a specific code by only using the navigational hierarchy of the catalogue on the home screen i.e. without entering a search term.  |
|**Measuring Method** | 9 Point scale from 00:00 min up to 07:00 min with intervals of 00:30s |
| **Worst Case**| Score +07:00 to 02:00 min:  Detail information about a code cannot be found fast or are not visible enough. The user will likely switch to another application.|
| **Acceptable** | Score 01:30 to 02:00 min: it takes a bit of searching time, but the code can be found. Also taken into account different levels of knowledge about the catalogue hierarchy and the reading time to go through the elements of the catalogue |
| **Planned**| Score 01:00 min to 01:30 min: The hierarchy of the catalog is displayed nicely and browsing through it is easy. |
| **Best** | Score 00:00 min to 01:00 min: The complex hiearchy is well structured so that codes can be found fast using it  |

| #18                           | Time to find tooltip              |
|-----------------------------------|---------------------------------|
|**Measuring Concept** | Time (mm:ss) it takes to find the tooltip feature (hover text on code path describing hierarchy elements) |
|**Measuring Method** | 9 Point scale from 00:00 min up to +02:30 min with intervals of 00:05s, 00:15s and 00:30s (increasing) |
| **Worst Case**| Score +02:30 to 00:30 min:  Takes too long to find the feature |
| **Acceptable** | Score 00:15 to 00:30 min: Time it takes to find the feature is acceptable. The time to find this feature has its peak at the initial search. Afterwards, it will improve |
| **Planned**| Score 00:10 min to 00:15 min: Feature is intuitive and can be found easily |
| **Best** | Score 00:00 min to 00:10 min: The feature can be found very easily and fast.|

| #19                           | Time to open remembered code           |
|-----------------------------------|---------------------------------|
|**Measuring Concept** | Time (mm:ss) it takes to open a code from the rembered list. |
|**Measuring Method** | 9 Point scale from 00:00 min up to +02:30 min with intervals of 00:05s, 00:15s and 00:30s (increasing) |
| **Worst Case**| Score +02:30 to 00:30 min:  Takes too long to find the list of remembered codes and open the code from there |
| **Acceptable** | Score 00:15 to 00:30 min: List can be found within reasonable time.  |
| **Planned**| Score 00:10 min to 00:15 min: Remember list is clearly visible and can easily be accessesed |
| **Best** | Score 00:00 min to 00:10 min: The list is super easy to access .|

| #20                         | Time to access sibling code                |
|-----------------------------------|---------------------------------|
|**Measuring Concept** | Time (mm:ss) it takes to find the sibling code and easily switch to it. |
|**Measuring Method** | 9 Point scale from 00:00 min up to 03:30 min with intervals of 00:30s |
| **Worst Case**| Score +03:30 to 01:30 min:  Takes too long to find the feature/add the code|
| **Acceptable** | Score 01:00 to 01:30 min: Time it takes to find the feature/sibling code are within limits and might improve as soon as you know where the feature is|
| **Planned**| Score 00:30 min to 01:00 min: Correct labels, clear structure and visible positioning of the sibling elements allows the user to find them fast.  |
| **Best** | Score 00:00 min to 00:30 min: The sibling codes are easily visible so coders can browse through them to further clarify search |

| #21                         | Time to access catalogue in different language       |
|-----------------------------------|---------------------------------|
|**Measuring Concept** | Time (mm:ss) it takes for the user to select a catalogue whose version is not available in the selected language, to switch the langue and then access the catalogue.  |
|**Measuring Method** | 9 Point scale from 00:00 min up to 03:30 min with intervals of 00:30s |
| **Worst Case**| Score +03:30 to 01:30 min:  Multilingual usage is not properly supported. Catalogues are not available in all languages, so switching to other language version must be easy. |
| **Acceptable** | Score 01:00 to 01:30 min: Time it takes to access other catalogue language version is still reasonable|
| **Planned**| Score 00:30 min to 01:00 min: Correct signaling of unavailable catalogue verison (in selected language) and user guidance to switch it ensures efficient switching  |
| **Best** | Score 00:00 min to 00:30 min: Switching to other catalogue language versions is easy and fast |

#### 3.3.3 Effectivity Usability Requirement
| #22                             | Task success ratio                  |
|-----------------------------------|---------------------------------|
|**Measuring Concept** | Percentage of successfully completed tasks |
|**Measuring Method** | Scale from 0-100%  |
| **Worst Case**| Score 0% - 75%:  Features are not intuitiv, application is hard to use. |
| **Acceptable** | Score 75% to 80% : Most features are intuitiv and can be used.|
| **Planned**| Score 80% to 90%: The features are easy to use with only a few exceptions.  |
| **Best** | Score 90% to 100%: All features are easy to use and intuitiv.   |

| #23                             | Intuitivity                 |
|-----------------------------------|---------------------------------|
|**Measuring Concept** | Average number of times the user had to select the back button, because he was misguided by the application.   |
|**Measuring Method** | Measured in average times on a scale form 0x to +6x  |
| **Worst Case**| Score 4 to 6 times:  Application is misguiding the user which harms the efficiency. |
| **Acceptable** | Score 2 to 3 times : Application mostly supporting the user flow. Nearly no misguidances.|
| **Planned**| Score 1 time: Intuitiv user guidance.  |
| **Best** | Score 0 times: No misguidances, very intuitiv   |


# 4. Questions
------------
##### Meeting Minutes (Discussed Questions)
- no more open questions
