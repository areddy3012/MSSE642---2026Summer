# Project 3: Performance Testing

## General Instructions

### Group Work
This can be a group collaboration assignment. You will need to choose a partner for this assignment. If you would like to work individually, you can do that too. If you work as a group, put both names on your assignment. Let me know your groups in Slack.

### Introduction
• This project allows you to apply the concepts in this class in a working program.
• You need to install JMeter on your PC or MAC. This requires that you install the JDK, which was also a requirement for the JUnit Assignment.
• Refer to the following link for details on JMeter: https://jmeter.apache.org/usermanual/index.html
• There are several tutorials on JMeter. Use any that you have access to. The following one is free: https://www.softwaretestinghelp.com/jmeter-tutorials/
• You are encouraged to deploy your own app for testing. This can be as simple as a static website. If you don't have experience with this, then you are encouraged work on a team with someone who knows how to deploy a webapp of some kind. If you get stuck, the instructor will give you a website for testing.

## Part 1: Research on Performance Testing and JMeter
Research the following topics for a writeup that will be included as part of your deliverable.

• Describe three types of performance tests and include graphs (3) for each test that plots "Time" on the X axis and "Number of Threads" on the Y axis.
  ◦ Load
  ◦ Endurance
  ◦ Stress/Spike
• Describe the following components of JMeter (include screen shots of how they are used):
  ◦ Thread groups
  ◦ A HTTP request sampler
  ◦ Config elements
  ◦ Listeners
• Describe an "Application Performance Index."

## Part 2: JMeter Video Demo or Test Document with Screen Shots
You are encouraged to create a video using video capture tool (PowerPoint, Camtasia, etc.) that will demo the following functionality in JMeter. If you don't feel comfortable doing a video, you can submit a test document with screen shots.

### Perform the following in JMeter
1. Create a Thread Group for an Endurance Test. Name it appropriately.
2. Create a HTTP Request Sampler.
3. Create a GET request.
4. In the Thread Group, select "Config Elements" > "HTTP Header Manager." Add appropriate header data.
5. Access Thread Group > "Listeners" > "View Results Tree."

### Repeat for a different kind of test
1. Repeat the steps above for a different kind of test, e.g. Load, Stress, etc.

## Extra Credit
• What Linux commands can be used to test and evaluate performance on a Virtual Machine or server?

## Rubric Summary
|  |
|  |
| Introduction | Proved an overview of the project. |
| Cover the following points in Part 1 | Types of performance tests, components of JMeter, Application Performance Index. |
| Video demo or paper screen shots of Part 2. | Demonstrate all of the points listed in Part 2. |
| Conclusion and Recommendations | Summary of what you learned about integration testing and APIs. What recommendations would you make to improve this assignment? |

Submit your Project #2 in markdown format in your GitHub Repo.

• If you worked as a team, include all team members on the paper.
