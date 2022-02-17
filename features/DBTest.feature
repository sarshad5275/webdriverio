Feature: DB Test Automation

@DBTest
Scenario: Connect and retrieve data from DB Table
    Given User successfully connected Database
    When User creates and inserts data into a table
    Then User retrieves data from the table