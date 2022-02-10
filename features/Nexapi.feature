Feature: NexPort API Automation

Background: Login to Application
    Given User has Nexport login credentials
    Then User successfully connected Nexport Application

@Nexapitest
Scenario: Get Nexport API data
    Given User successfully connected Nexport Application
    When User provides required parameters for getting "<given api>" data
    Then User successfully retrieves "<given api>" data

    Examples:
    | given api |
    | profile data |
    | holiday list |