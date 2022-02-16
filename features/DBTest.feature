Feature: DB Test Automation

@DBTest
Scenario: Connect and retrieve data from DB
    Given User successfully connected Database
    When User inserts data into a table
    Then User retrieves data from the table