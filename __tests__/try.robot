*** Settings ***
Documentation     A test suite with a single test for valid login.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Library           OperatingSystem
Library           Selenium2Library
Library                SSHLibrary
Library  Process
Library    DateTime

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

Valid_Admin_Add_Artist_and_Add_Item
    [Tags]        demo 

    Open Browser  http://localhost:3000/  chrome

    Login Admin
    Sleep  1
    Add A1
    Add A1I1

    Look A1

    Edit A1I1
    Look A1
    Delete A1I1ed
    Look A1
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

Valid_Admin_Add_Event
    Open Browser  http://localhost:3000/  chrome

    Login Admin
    Add Event E1
    Edit Event E1
    Delete Event E1ED
    Logout
    Close Browser
Valid_Cashier_Buy
    Open Browser  http://localhost:3000/  chrome
    Login Admin
    Add A1
    Add A1I1
    Logout 
    Login Cashier
    Order two cupcake
    Close Browser
Valid_Cashier_Restock
    Open Browser  http://localhost:3000/  chrome

    Login Cashier
    Restock cupcake
    Restock cupcake
    Close Browser
Wrong_Admin_Add_Artist
    Open Browser  http://localhost:3000/  chrome

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

Edit A1
    Sleep  3
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
    ${NEW_PATH}=  Normalize Path  ${CURDIR}${/}../public/photo/array1.png
    Choose File  id=addItemPhotoPickerInput  ${NEW_PATH}
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
    ${NEW_PATH}=  Normalize Path  ${CURDIR}${/}../public/photo/array1.png
    Choose File  id=editItemPhotoPickerInput  ${NEW_PATH}
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

Add Event E1
    Sleep  1
    Click Element  id=manageEvents
    Click Element  id=addEventsOption

    Input Text  id=newEventName  e1

    Click Element  id=addStartEventDate

    ${CurrentDate}    Get Current Date    result_format=%d/%m/%Y
    Input Text  id=addStartEventDate  ${CurrentDate}
    
    ${CurrentDate}    Get Current Date
    ${NextDate}  Add Time To Date  ${CurrentDate}   3 days   
    ${NextDate}  Convert Date  ${NextDate}  result_format=%d/%m/%Y
    
    Input Text  id=addEndEventDate  ${NextDate}
    Click Button  id=addEventButton
    Handle Alert  action=DISMISS
    Handle Alert  action=DISMISS
Edit Event E1
    Sleep  1
    Click Element  id=manageEvents
    Click Element  id=editEventsOption

    Click Element  id=selectedEvent
    Sleep  1
    Click Element  id=selectedEvent
    Sleep  1
    Click Element  id=selectedEvent
    Sleep  1

    Select From List By Label  id=selectedEvent  e1

    Input Text  id=editEventName  e1ed

    Click Element  id=editStartEventDate

    ${CurrentDate}    Get Current Date    result_format=%d/%m/%Y
    Input Text  id=editStartEventDate  ${CurrentDate}
    
    ${CurrentDate}    Get Current Date
    ${NextDate}  Add Time To Date  ${CurrentDate}   5 days   
    ${NextDate}  Convert Date  ${NextDate}  result_format=%d/%m/%Y
    
    Input Text  id=editEndEventDate  ${NextDate}
    Sleep  5
    Click Button  id=editEventButton
Delete Event E1ED
    Sleep  2
    Click Element  id=manageEvents
    Click Element  id=editEventsOption

    Click Element  id=selectedEvent
    Sleep  1
    Click Element  id=selectedEvent
    Sleep  1
    Click Element  id=selectedEvent
    Sleep  1

    Select From List By Label  id=selectedEvent  e1ed
    Click Button  id=deleteEventButton
    Handle Alert  action=DISMISS

Order two cupcake
    Sleep  1
    Click Button  id=newOrderButton
    Click Element  id=artistsListDropdown
    Sleep  1
    Click Element  id=artistsListDropdown
    Sleep  1

    Select From List By Label  id=artistsListDropdown  a1
    Select From List By Label  id=artistsListDropdown  a1
    Click Element  xpath=/html/body/div[3]/div/div/form/div[2]/div[1]/div[2]/div/div/div/div/a
    Click Element  xpath=/html/body/div[3]/div/div/form/div[2]/div[1]/div[2]/div/div/div/div/a
    Sleep  3
    Click Button  xpath=/html/body/div[3]/div/div/form/div[2]/div[2]/div[2]/table/tr/td[5]/button
    Click Button  xpath=/html/body/div[3]/div/div/form/div[2]/div[2]/div[2]/table/tr/td[5]/button
    Click Button  xpath=/html/body/div[3]/div/div/form/div[2]/div[2]/div[2]/table/tr/td[5]/button
    Click Button  xpath=/html/body/div[3]/div/div/form/div[2]/div[2]/div[2]/table/tr/td[5]/button
    Click Button  xpath=/html/body/div[3]/div/div/form/div[2]/div[2]/div[2]/table/tr/td[4]/button

    Click Element  id=artistsListDropdown
    Sleep  1
    Click Element  id=artistsListDropdown
    Sleep  1

    Select From List By Label  id=artistsListDropdown  Summer-Rose Quintero
    Click Element  xpath=//*[@id="60211452fc25773d0c6b21b3-buyItem"]/div/div/a
    Click Element  xpath=//*[@id="60211452fc25773d0c6b21b3-buyItem"]/div/div/a
    Click Button  xpath=//*[@id="60211452fc25773d0c6b21b3Cart"]/td[1]/button

    Click Button  id=checkoutBtn
    Sleep  5
Restock cupcake
    Sleep  1
    Click Element  id=restockItem

    Click Element  id=artistsListDropdown
    Sleep  1
    Click Element  id=artistsListDropdown
    Sleep  1
    Select From List By Label  id=artistsListDropdown  Summer-Rose Quintero
    Sleep  5

    Click Element  xpath=/html/body/div[3]/div/div/form/div[2]/div/div/div[1]/div/div/div/div[2]/div/div/a
    Input Text  id=newPriceStock  10
    Click Button  id=addStocks
    Handle Alert  action=DISMISS
    Reload Page
Wrong Admin Add Artist
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
Look A1
    Sleep  3
    Click Element  xpath=/html/body/div/div/div[2]/div[1]/div/div[4]/div/div/a
    Sleep  5
    Click Button  xpath=/html/body/div[3]/div/div/div[1]/button

