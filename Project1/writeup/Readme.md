# Project 1: Triangle Classification Unit Test
MSSE640 Spring 2026
Language: Java, IDE: Visual Studio Code

## Introduction

This project focused on designing a small Java program that determines whether three input values form a valid triangle and, if so, identifies the triangle type (equilateral, isosceles, or scalene). The assignment also required handling “rainy‑day” cases such as zero or negative side lengths and writing unit tests to validate the program’s behavior.

**Error Handling Approach:** The program uses a combination of program logic and custom exceptions:
- Program logic validates basic constraints (zero/negative values, triangle inequality theorem)
- Custom `InvalidTriangleException` is thrown when attempting to classify invalid triangles
- The `isValid()` method handles rainy-day cases without throwing exceptions

**Unit Testing Strategy:** We created 11 comprehensive JUnit 5 tests covering:
- Valid/invalid triangle detection
- All three triangle type classifications
- Order-independence of triangle sides
- Rainy-day cases (zero, negative, multiple zeros, triangle inequality violations)

---

## Details of the Program

**IDE Used:** Visual Studio Code with Java Extensions

**Data Input Method:** 
- No interactive user input required for this phase
- Data is provided exclusively through Unit Tests using JUnit 5 framework
- This approach ensures automated, repeatable testing and reliable validation
- Although a driver program (TriangleApp.java) exists for manual testing, all validation for this assignment was performed through automated JUnit tests.


**Output Method:**
- Test results displayed via JUnit Platform Console runner
- Test pass/fail status reported to console with detailed summary
- No file output; all results are console-based

**Language & Framework:**
- **Language:** Java
- **Test Framework:** JUnit 5 (Jupiter) version 5.10.0
- **Build Structure:** Organized into `src/` (source code), `test/` (unit tests), `bin/` (compiled classes)

---

## Table of Example Test Data

| Test Case | Input (a, b, c) | Expected Output | Test Method |
|-----------|-----------------|-----------------|-------------|
| Valid Scalene | (3, 4, 5) | Valid = true, Type = "Scalene" | testValidTriangle(), testScaleneTriangle() |
| Scalene (Different Order) | (4, 5, 3) | Valid = true, Type = "Scalene" | testScaleneAllOrders() |
| Equilateral | (5, 5, 5) | Valid = true, Type = "Equilateral" | testEquilateralTriangle() |
| Isosceles | (5, 5, 3) | Valid = true, Type = "Isosceles" | testIsoscelesTriangle() |
| Isosceles (Different Order) | (5, 3, 5) | Valid = true, Type = "Isosceles" | testIsoscelesAllOrders() |
| Zero Side | (0, 4, 5) | Valid = false | testZeroLengthSide() |
| Negative Side | (-1, 4, 5) | Valid = false | testNegativeNumbers() |
| Triangle Inequality Violation | (1, 2, 3) | Valid = false | testViolatesTriangleInequality() |
| Multiple Zeros | (0, 0, 0) | Valid = false | testMultipleZeros() |
| Invalid Triangle Exception | (1, 2, 10) | Throws InvalidTriangleException | testInvalidTriangleException() |

---

## Unit Tests Description

We created **11 comprehensive JUnit 5 test cases** organized as follows:

### Happy Path Tests (Valid Cases)
1. **testValidTriangle()** - Validates that (3, 4, 5) is recognized as a valid triangle
2. **testScaleneTriangle()** - Confirms (3, 4, 5) is correctly classified as Scalene
3. **testEquilateralTriangle()** - Verifies (5, 5, 5) is classified as Equilateral
4. **testIsoscelesTriangle()** - Confirms (5, 5, 3) is classified as Isosceles

### Order-Independence Tests
5. **testScaleneAllOrders()** - Tests Scalene classification with different side orderings
6. **testIsoscelesAllOrders()** - Tests Isosceles classification with different side orderings

### Rainy-Day / Edge Case Tests
7. **testZeroLengthSide()** - Validates rejection of zero-length sides
8. **testNegativeNumbers()** - Tests rejection of negative side lengths
9. **testViolatesTriangleInequality()** - Tests triangle inequality theorem (sum of two sides must exceed the third)
10. **testMultipleZeros()** - Tests various combinations of zero values
11. **testInvalidTriangleException()** - Verifies that calling `getType()` on invalid triangles throws the custom exception

### Test Selection Rationale
- **Robustness:** Tests cover both valid cases and comprehensive error conditions per Chapter 1 requirements
- **Boundary Testing:** Zero and negative values test critical boundaries
- **Triangle Properties:** Order-independence ensures the algorithm is mathematically correct
- **Exception Handling:** Validates proper error signaling for invalid inputs
- **Coverage:** 11 tests provide broad coverage of classification logic and validation rules

---

## Bugs Encountered During Testing

During development, a few issues surfaced: 

1. Triangle Inequality Logic 

Initially, I mistakenly used >= instead of >, which incorrectly allowed degenerate triangles. Updating the condition to strict inequality resolved the issue. 

2. Misclassification of Isosceles Triangles 

The first version of the classification method checked for scalene before checking for isosceles, which caused incorrect results. Reordering the conditions fixed the problem. 

3. JUnit Test Discovery in VS Code 

VS Code did not detect tests until the folder structure was corrected and the Java Test Runner extension was enabled. Once configured, all tests ran successfully. 

## Problems Encountered 

A few challenges occurred during the project: 

Setting up Git integration in VS Code required installing Git and enabling the built‑in Git extension. 

Folder structure had to be created manually because GitHub does not allow empty folders. 

Handling invalid input required deciding between logical checks and custom exceptions; ultimately, both were used for clarity and robustness. 

JUnit configuration required ensuring the correct version of JUnit 5 was recognized by VS Code. 

These issues were resolved through configuration adjustments and incremental testing. 

### Resolution
- Used explicit JAR paths: `junit-jupiter-api-5.10.0.jar`, `junit-jupiter-engine-5.10.0.jar`
- Utilized `junit-platform-console-standalone-1.10.0.jar` for simplified test execution
- Created `bin/` directory structure for cleaner separation of source and compiled code

### Key Learning
- Maintaining separate folders for source (`src/`), tests (`test/`), and compiled output (`bin/`) improves project organization
- JUnit Platform Console provides an easy, straightforward way to run tests without IDE integration

---

## Screenshots

### Successful Compilation
```
Command: javac -d bin src\*.java
Result: Successful (Exit Code 0)
All source files compiled without errors
```

### Successful Test Execution
```
Command: java -jar lib/junit-platform-console-standalone-1.10.0.jar --scan-classpath --classpath bin

Test Results:
✓ 11 tests found
✓ 11 tests successful  
✓ 0 tests failed
✓ 0 tests skipped
✓ 0 containers aborted

Test Summary:
- testValidTriangle() [OK]
- testScaleneTriangle() [OK]
- testScaleneAllOrders() [OK]
- testZeroLengthSide() [OK]
- testInvalidTriangleException() [OK]
- testEquilateralTriangle() [OK]
- testIsoscelesTriangle() [OK]
- testIsoscelesAllOrders() [OK]
- testNegativeNumbers() [OK]
- testViolatesTriangleInequality() [OK]
- testMultipleZeros() [OK]

Run finished after 201 ms - Status: PASSED
```
![alt text](image.png)
---

## Source Code Summary

### Triangle.java
Implements two static methods:
- `isValid(double a, double b, double c): boolean` - Validates triangle using triangle inequality theorem
- `getType(double a, double b, double c): String` - Returns triangle classification or throws InvalidTriangleException

### InvalidTriangleException.java
Custom checked exception for invalid triangle inputs during classification.

### TriangleTest.java
JUnit 5 test suite with 11 comprehensive test cases covering all requirements.

---

## Conclusion

The Triangle Classification program successfully:
✓ Validates triangle inputs against mathematical rules  
✓ Classifies valid triangles by type  
✓ Handles all rainy-day cases gracefully  
✓ Passes all 11 unit tests  
✓ Demonstrates proper error handling with custom exceptions  

The project meets all assignment requirements from Chapter 1 and provides a robust foundation for triangle analysis.
