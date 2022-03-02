Feature: Database Automation

@DBTest
Scenario: Database Automation
    Given User successfully connected Database
    When User inserts data into a table
    Then User retrieves data from the table
