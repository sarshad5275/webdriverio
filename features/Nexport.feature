Feature: NexPort Website Automation

  Scenario Outline: Login to Nexport website

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a message saying <message>

    Examples:
      | username | password             | message                        |
      | svalluri | ae816bea75f8e7bb8e5f6aaa1558fb44b28b95db140131b40e21175e455434ea264dd9dcf8a3c0c4c0f505efda8c88662dbbac9b704a73bd853298806fcac08a5fa40d868f18c6af7148ec2a8ce45311e677b7573e0ec6a4f9fa1b561b137a971f96141ac46851f73719 | You logged into a Nexport! |
