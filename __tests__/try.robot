*** Settings ***
Documentation     A test suite with a single test for valid login.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Library           OperatingSystem
Library           SeleniumLibrary
Library           Selenium2Library
Library                SSHLibrary
Library  Process

*** Variables ***
${MY-VARIABLE}    a variable 
${LOGIN URL}      http://localhost:3000
${BROWSER}        Chrome
*** Test Cases ***
Valid Login
    [Tags]        demo 

    Open Browser www.google.com chrome

    Log           ${MY-VARIABLE}

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Title Should Be    Log In
    Log           ${MY-VARIABLE}
    

