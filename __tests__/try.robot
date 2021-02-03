*** Settings ***
Documentation     A test suite with a single test for valid login.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Library           OperatingSystem
Library           Selenium2Library
Library                SSHLibrary
Library  Process

*** Variables ***
${MY-VARIABLE}    a variable 
${LOGIN URL}      http://localhost:3000
${BROWSER}        Chrome
*** Test Cases ***
Valid_Open_Browser
    [Tags]        demo 

    Open Browser  http://localhost:3000/  chrome

    Log           ${MY-VARIABLE}
    Close Browser

Valid_Admin_Login
    [Tags]        demo 

    Open Browser  http://localhost:3000/  chrome

    Login Admin
    Sleep  3
    Logout 
    Sleep  5
    Input Text  id=userName  admin
    Close Browser

Valid_Admin_Manage_Artists
    [Tags]        demo 

    Open Browser  http://localhost:3000/  chrome

    Login Admin
    Sleep  3

    Click Element  id=manageArtists
    Click Element  id=addArtistsOption
    Sleep  3
    Click Element  xpath=//*[@id="manageArtistsWindow"]/div/div/div[1]/button


    Logout 
    Sleep  5
    Input Text  id=userName  admin
    Close Browser

Valid_Admin_Add_and_Delete_Artists
    [Tags]        demo 

    Open Browser  http://localhost:3000/  chrome

    Login Admin
    Sleep  1

    Click Element  id=manageArtists
    Click Element  id=addArtistsOption
    Sleep  1
    Click Element  id=addArtistsOption
    Input Text  id=newArtistName  a1
    Input Text  id=newArtistIDNo  1181
    Input Text  id=newArtistPassword  a1pw
    Click Element  id=addArtistButton
    Sleep  1


    Click Element  id=manageArtists
    Click Element  id=editArtistsOption

    Click Element  id=artistsListDropdownEdit
    Sleep  1
    Click Element  id=artistsListDropdownEdit
    Sleep  1


    Select From List By Label  id=artistsListDropdownEdit  a1
    Input Text  id=editArtistName  a1ed
    Input Text  id=editArtistIDNo  1181
    Click Button  id=editArtistButton

    Sleep  1
    Click Element  id=manageArtists
    Click Element  id=editArtistsOption

    Click Element  id=artistsListDropdownEdit
    Sleep  1
    Click Element  id=artistsListDropdownEdit
    Sleep  1
    Select From List By Label  id=artistsListDropdownEdit  a1ed

    Click Button  id=deleteArtistButton
    Sleep  1
    Handle Alert  

    Logout 
    Sleep  1
    
    Close Browser

*** Keywords ***
Login Admin
    Input Text  id=userName  admin
    Input Text  id=password  pw123
    Click Button  id=loginButton
    Log           ${MY-VARIABLE}

Logout 
    
    Click Element  id=user-dropdown
    Click Element  xpath=//*[@id="userMenu"]/div[2]/div/a
    

