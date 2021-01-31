*** Settings ***
Library  Selenium2Library

*** Test Cases ***
Open WebApp
 
    Open Browser  http://localhost:3000/  chrome
    Close Browser

Admin Click on Artist Card
 
    Open Browser  http://localhost:3000/  chrome
    Login Admin
    Wait Until Element Is Visible  xpath=/html/body/div/div/div[2]/div[1]/div/div[1]/div/div/a
    Click Element   xpath=/html/body/div/div/div[2]/div[1]/div/div[1]/div/div/a
    Sleep  5
    Close Browser

*** Variables ***
${URL}  http://localhost:3000/

*** Keywords ***
Login Admin
    Input Text  id=userName   admin
    Input Password  id=password  pw123
    Click Button  id=loginButton


