Feature: Bamboo Website Automation

@BambooFirst
Scenario: Login to Bamboo Application
    Given User is on the Bamboo login page
    When User logins with given Bamboo credentials
    Then User successfully logged into Bamboo Application