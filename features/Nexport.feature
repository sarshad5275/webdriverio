Feature: NexPort Website Automation

Background: Login to Application
    Given User is on the login page
    When User logins with given credentials
    Then User successfully logged into Application

@First
Scenario: Search with Admin in JobTitle Field
    Given User successfully logged into Application
    When User searches with "<TitleName>" in JobTitle
    Then compare with the given "<ExpectedValue>" value

Examples:
    | TitleName | ExpectedValue |
    | Admin | AdminData |

@Second
Scenario: Search with Admin in JobTitle Field
    Given User successfully logged into Application
    When User searches with "<TitleName>" in JobTitle
    Then compare with the given "<ExpectedValue>" value

    Examples:
    | TitleName | ExpectedValue |
    | Skill | AutomationData |