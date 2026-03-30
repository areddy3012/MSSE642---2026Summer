# Equivalence Classes & Boundary Value Analysis

## Introduction

For this week's assignment, I studied Equivalence Class Partitioning (ECP) and Boundary Value Analysis (BVA), two foundational black-box testing techniques discussed in *The Art of Software Testing*. As someone still learning how to design effective tests, these methods helped me understand how to reduce the number of test cases while still covering the most important input conditions.

One of the key ideas emphasized in the book is that testing is not about trying every possible input, but about selecting a small number of inputs that are most likely to reveal defects. ECP helps by dividing inputs into groups (or "classes") that should behave the same, while BVA focuses on the edges of those classes because that's where bugs often occur.

## When These Techniques Should Be Used

- When the input domain is large and exhaustive testing is unrealistic
- When inputs fall into clear numeric or categorical ranges
- When validating user input or form fields
- When the system has well-defined validity rules

## Limitations (Based on the Book's Guidance)

- ECP assumes all values in a class behave the same, which may not always be true
- BVA is most effective for numeric ranges
- Neither technique tests internal logic or code paths
- These methods should be combined with structural testing for full coverage

Overall, *The Art of Software Testing* helped me see why these techniques are considered essential for systematic and efficient test design.

## Vibe Coding Assignment

To apply ECP and BVA, I built a small Triangle Classifier web app using Replit (HTML, CSS, and JavaScript). The user enters three side lengths, and the app classifies the triangle as:

- Equilateral
- Isosceles
- Scalene
- Invalid (if the sides don't form a valid triangle)

I chose this example because the rules for triangle validity are clear, and the input ranges naturally lend themselves to equivalence classes and boundary values — exactly the kind of scenario the book encourages for practicing these techniques.

### Sunny Day Scenario (Valid Input)

**Input Example:**
- Side A: 2
- Side B: 5
- Side C: 5

**Expected Output:**
- Isosceles Triangle

**Screenshot:**
![Sunny Day - Valid Input](./Equivalence_Testing/Screenshots/sunny_day.png)

### Rainy Day Scenario (Invalid Input)

**Input Example:**
- Side A: 2
- Side B: 3
- Side C: 5

**Expected Output:**
- Invalid: Triangle inequality violated

**Screenshot:**
![Rainy Day - Invalid Input](./Equivalence_Testing/Screenshots/rainy_day.png)

## Core Logic Snippet (script.js)

```javascript
function classify(){
  const a = parseInt(document.getElementById("sideA").value);
  const b = parseInt(document.getElementById("sideB").value);
  const c = parseInt(document.getElementById("sideC").value);
  const resultDiv = document.getElementById("result");

  if (a <= 0 || b <= 0 || c <= 0) {
    resultDiv.textContent = "Invalid: All sides must be positive.";
    return;
  }

  if (a + b <= c || a + c <= b || b + c <= a) {
    resultDiv.textContent = "Invalid: The sides do not form a valid triangle (triangle inequality violated).";
    return;
  }

  if (a === b && b === c) {
    resultDiv.textContent = "Equilateral Triangle";
  }
  else if (a === b || b === c || a === c) {
    resultDiv.textContent = "Isosceles Triangle";
  }
  else {
    resultDiv.textContent = "Scalene Triangle";
  }
}
```

## Test Cases Based on ECP and BVA

### Equivalence Classes (ECP)

Following the book's guidance, I identified valid and invalid classes:

| Class | Example Input | Expected Output |
|-------|---------------|-----------------|
| Valid Equilateral | (5,5,5) | Equilateral |
| Valid Isosceles | (5,5,3) | Isosceles |
| Valid Scalene | (3,4,5) | Scalene |
| Invalid: Non-positive | (0,5,5) | Invalid |
| Invalid: Triangle inequality | (2,3,10) | Invalid |

### Boundary Value Analysis (BVA)

Based on the book's principle that defects often occur at boundaries:

| Boundary | Input | Expected |
|----------|-------|----------|
| Minimum valid | (1,1,1) | Equilateral |
| Just below valid | (0,1,1) | Invalid |
| Triangle inequality boundary | (3,4,7) | Invalid |
| Just inside boundary | (3,4,6) | Scalene |

## Conclusion

As a student learning software testing, this assignment helped me understand how ECP and BVA make test design more systematic and intentional. Before reading *The Art of Software Testing*, I assumed testing meant trying out lots of random inputs. The book made me realize that effective testing is about choosing the right inputs, not the most inputs.

Building the Replit UI also helped me visualize how different inputs behave, and taking screenshots of Sunny Day and Rainy-Day scenarios made the test cases feel more concrete. AI tools helped me structure the app and test cases, but I still had to think through the logic myself — especially when applying the triangle inequality rule.

Overall, this assignment strengthened my understanding of how to design meaningful test cases and why these classic techniques are still relevant today.
