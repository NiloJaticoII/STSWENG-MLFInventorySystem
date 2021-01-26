*** Settings ***
Documentation     A test suite with a single test for valid login.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Library           OperatingSystem
Library           SeleniumLibrary

*** Variables ***
${MY-VARIABLE}    a variable 
${LOGIN URL}      http://localhost:3000
${BROWSER}        Chrome
*** Test Cases ***
Valid Login
    [Tags]        demo 
    Log           ${MY-VARIABLE}
    Run           npm run dev
    Open Browser To Login Page
    [Teardown]    Close Browser

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Title Should Be    Log In
    Log           ${MY-VARIABLE}
    
