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
    Sleep  1
    Logout 
    Sleep  1
    Input Text  id=userName  admin
    Close Browser

Valid_Admin_Manage_Artists
    [Tags]        demo 

    Open Browser  http://localhost:3000/  chrome

    Login Admin
    Sleep  1

    Click Element  id=manageArtists
    Click Element  id=addArtistsOption
    Sleep  1
    Click Element  xpath=//*[@id="manageArtistsWindow"]/div/div/div[1]/button


    Logout 
    Sleep  1
    Input Text  id=userName  admin
    Close Browser

Valid_Admin_Add_and_Delete_Artists
    [Tags]        demo 

    Open Browser  http://localhost:3000/  chrome

    Login Admin
    Sleep  1

    Add A1


    Edit A1

    Sleep  1
    Delete A1ed

    Sleep  1
    Handle Alert  

    Logout 
    Sleep  1
    
    Close Browser

Valid_Admin_Add_and_Add_Item
    [Tags]        demo 

    Open Browser  http://localhost:3000/  chrome

    Login Admin
    Sleep  1
    Add A1
    Add A1I1
    Edit A1I1
    Delete A1I1ed

    Edit A1
    Delete A1ed
    Handle Alert  action=DISMISS
    Logout 
    Sleep  1
    
    Close Browser
Valid_Cashier_Login
    Open Browser  http://localhost:3000/  chrome
    Login Cashier

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

Add A1
    Click Element  id=manageArtists
    Click Element  id=addArtistsOption
    Sleep  1
    Click Element  id=addArtistsOption
    Input Text  id=newArtistName  a1
    Input Text  id=newArtistIDNo  1181
    Input Text  id=newArtistPassword  a1pw
    Click Element  id=addArtistButton
    Sleep  1

Edit A1
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

Delete A1ed
    Sleep  1
    Click Element  id=manageArtists
    Click Element  id=editArtistsOption

    Click Element  id=artistsListDropdownEdit
    Sleep  1
    Click Element  id=artistsListDropdownEdit
    Sleep  1
    Select From List By Label  id=artistsListDropdownEdit  a1ed

    Click Button  id=deleteArtistButton

Add A1I1

    Click Element  id=manageItems
    Click Element  id=addItemOption
    Sleep  1
    Click Element  id=artistsListDropdownItemAdd
    Sleep  1
    Click Element  id=artistsListDropdownItemAdd
    Sleep  1
    Select From List By Label  id=artistsListDropdownItemAdd  a1
    Input Text  id=newItemName  a1i1
    Input Text  id=newItemPriceStock  1
    Input Text  id=newItemStockQuantity  100
    Choose File  id=addItemPhotoPickerInput  C:/PictureTest/array2.png
    Click Button  id=addItemButton
    Handle Alert  action=DISMISS


Edit A1I1
    Click Element  id=manageItems
    Click Element  id=editItemOption
    Sleep  5
    Click Element  id=artistsListDropdownItemEdit
    Sleep  1
    Click Element  id=artistsListDropdownItemEdit
    Sleep  1
    Select From List By Label  id=artistsListDropdownItemEdit  a1

    Click Element  id=artistsListDropdownItem
    Sleep  1
    Click Element  id=artistsListDropdownItem
    Sleep  1
    Select From List By Label  id=artistsListDropdownItem  a1i1
    
    Input Text  id=editItemName  a1i1ed
    Input Text  id=editItemStockQuantity  101
    Choose File  id=editItemPhotoPickerInput  C:/PictureTest/arrayprint.png
    Click Button  id=editItemButton


Delete A1I1ed
    Sleep  5
    Click Element  id=manageItems
    Click Element  id=editItemOption
    Click Element  id=artistsListDropdownItemEdit
    Sleep  1
    Click Element  id=artistsListDropdownItemEdit
    Sleep  1
    Select From List By Label  id=artistsListDropdownItemEdit  a1

    Click Element  id=artistsListDropdownItem
    Sleep  1
    Click Element  id=artistsListDropdownItem
    Sleep  1
    Select From List By Label  id=artistsListDropdownItem  a1i1ed
    
    Click Button  id=deleteItemButton
    Click Button  xpath=/html/body/div[4]/div/div[3]/button[1]

Login Cashier
    Input Text  id=userName  1
    Input Text  id=password  pw123
    Click Button  id=loginButton
