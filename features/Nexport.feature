Feature: NexPort Website Automation

Background: Login to Nexport Application
    Given User is on the Nexport login page
    When User logins with given Nexport credentials
    Then User successfully logged into Nexport Application

@First
Scenario: Search with Admin in JobTitle Field
    Given User successfully logged into Nexport Application
    When User searches with "<TitleName>" in JobTitle
    Then compare with the given "<ExpectedValue>" value

Examples:
    | TitleName | ExpectedValue |
    | Admin | AdminData |

@Second
Scenario: Search with Automation skill in JobTitle Field
    Given User successfully logged into Nexport Application
    When User searches with "<TitleName>" in JobTitle
    Then compare with the given "<ExpectedValue>" value

Examples:
    | TitleName | ExpectedValue |
    | Skill | AutomationData |