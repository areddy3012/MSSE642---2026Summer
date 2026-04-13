# Vibe Coding Mini Project – Week 5  
## Decision Tables & Pairwise Testing  
**Author:** Anusha Reddy  
**Course:** MS Software Engineering – Week 5  
**Date:** 04/13/2026

---

## 1. Introduction

This mini‑project demonstrates how **decision tables** and **pairwise testing** can be used to design, validate, and test business logic for a small interactive application. These techniques are essential in software engineering when multiple input conditions influence system behavior.

### Why Decision Tables?
Decision tables are effective when:
- Multiple conditions influence an outcome  
- Rules must be **explicit, complete, and non‑overlapping**  
- Stakeholders need a clear mapping from **inputs → outputs**

**Strengths**
- Excellent for complex business logic  
- Easy to communicate to non‑technical stakeholders  
- Ensures full coverage of all rule combinations  

**Limitations**
- Can grow large as conditions increase  
- Harder to maintain when rules change  
- Does not prioritize which tests matter most  

---

### Why Pairwise Testing?
Pairwise testing (all‑pairs testing) ensures that **every pair of input values** appears at least once across the test suite.

**Strengths**
- High coverage with fewer tests  
- Efficient for systems with many parameters  
- Based on the principle that most defects arise from 2‑way interactions  

**Limitations**
- Does not cover 3‑way or higher‑order interactions  
- Requires domain knowledge to choose meaningful values  
- Not a replacement for full combinatorial testing  

---

## 2. Overview of the Sample App

### App Name  
**Loan Eligibility & Interest Rate Checker**

### Goal  
Given four user inputs, the app determines:
- **Loan Eligibility** (Yes / No)  
- **Interest Rate Tier** (Tier 1 / Tier 2 / Tier 3 / N/A)

### Inputs
1. **Credit Score Category**  
   - Low (300–579)  
   - Medium (580–699)  
   - High (700+)  

2. **Annual Income Level**  
   - Low (< $40,000)  
   - Medium ($40,000–$80,000)  
   - High (>$80,000)

3. **Existing Debt Status**  
   - Low Debt  
   - High Debt  

4. **Employment Status**  
   - Employed  
   - Unemployed  

### Outputs
- **Eligibility:** Eligible / Not Eligible  
- **Interest Tier:** Tier 1 / Tier 2 / Tier 3 / N/A  

---

## 3. Business Rules (Non‑Overlapping)

1. **Unemployed → Always Not Eligible (Tier = N/A)**  
2. **Employed + High Credit + High Income → Tier 1 (any debt)**  
3. **Employed + High Credit + Medium Income + Low Debt → Tier 1**  
4. **Employed + High Credit + Medium Income + High Debt → Tier 2**  
5. **Employed + High Credit + Low Income + Low Debt → Tier 2**  
6. **Employed + Medium Credit + High Income → Tier 2 (any debt)**  
7. **Employed + Medium Credit + Medium Income + Low Debt → Tier 2**  
8. **Employed + Medium Credit + Medium Income + High Debt → Tier 3**  
9. **Employed + Medium Credit + Low Income + Low Debt → Tier 3**  
10. **Employed + Low Credit + High Income → Tier 3 (any debt)**  
11. **Everything else → Not Eligible (Tier = N/A)**  

These rules cover all **36 possible combinations** of the 4 input parameters.

---

## 4. Decision Table (Simplified View)

| Rule | Credit Score | Income | Debt | Employment | Eligibility | Tier |
|------|--------------|--------|-------|------------|-------------|------|
| R1 | High | High | Low | Employed | Yes | Tier 1 |
| R2 | High | Medium | Low | Employed | Yes | Tier 1 |
| R3 | High | Medium/High | High | Employed | Yes | Tier 2 |
| R4 | Medium | High | Low | Employed | Yes | Tier 2 |
| R5 | Medium | Medium | Low | Employed | Yes | Tier 3 |
| R6 | Medium | Low | Any | Employed | No | N/A |
| R7 | Low | Any | Any | Any | No | N/A |
| R8 | Any | Any | Any | Unemployed | No | N/A |

---

## 5. Pairwise Test Suite

Full combinatorial testing would require:

Pairwise testing reduces this to a smaller but high‑coverage set.

### Pairwise Test Cases

| Test ID | Credit Score | Income | Debt | Employment | Expected Eligibility | Expected Tier |
|---------|--------------|--------|------|------------|----------------------|---------------|
| T1 | High | High | Low | Employed | Yes | Tier 1 |
| T2 | High | Medium | High | Employed | Yes | Tier 2 |
| T3 | High | Low | Low | Unemployed | No | N/A |
| T4 | Medium | High | High | Employed | Yes | Tier 2 |
| T5 | Medium | Medium | Low | Employed | Yes | Tier 3 |
| T6 | Medium | Low | High | Employed | No | N/A |
| T7 | Low | High | Low | Employed | No | N/A |
| T8 | Low | Medium | High | Unemployed | No | N/A |

---

## 6. Additional Functional Test Cases

| Test ID | Credit Score | Income | Debt | Employment | Expected Eligibility | Expected Tier |
|---------|--------------|--------|------|------------|----------------------|---------------|
| TC‑01 | High | High | Low | Employed | Yes | Tier 1 |
| TC‑02 | High | Medium | High | Unemployed | No | N/A |
| TC‑03 | High | Low | Low | Employed | Yes | Tier 2 |
| TC‑04 | Medium | High | High | Unemployed | No | N/A |
| TC‑05 | Medium | Medium | Low | Employed | Yes | Tier 2 |
| TC‑06 | Medium | Low | High | Unemployed | No | N/A |
| TC‑07 | Low | High | Low | Unemployed | No | N/A |
| TC‑08 | Low | Medium | High | Employed | No | N/A |
| TC‑09 | Low | Low | Low | Unemployed | No | N/A |

---

## 7. App Implementation Summary

The final app includes:


### Page 1 — Loan Checker
- Four dropdowns for user inputs  
- “Check Eligibility” button  
- Result panel showing:  
   - Eligibility  
   - Interest Tier  
   - Reasoning  
- Tier definitions (5–7%, 8–12%, 13–18% APR)

#### Screenshots

**Sunny Day Scenario:**
![Sunny day loan 2](Week5_Screenshots/Sunny%20day%20loan%202.png)

**Rainy Day Scenario:**
![Rainy day loan 2](Week5_Screenshots/Rainy%20day%20loan%202.png)

### Page 2 — Decision Table
- Full 36‑rule table  
- Filters for Employment Status and Tier  
- Business rules summary  

---

## 8. Conclusion

This project demonstrates how decision tables and pairwise testing can be used to design, validate, and test business logic in a structured and efficient way. The Loan Eligibility Checker app provides a clear, interactive example of how these techniques translate into real software behavior.
