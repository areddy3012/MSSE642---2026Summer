# Hands-On Project #2: Vulnerability Analysis  
## The Secure Software Development Lifecycle and the Threat Model

**Course:** MSSE Security Course  
**Project:** Assignment 2 Group Project  
**Student Name : Anusha Reddy  
**Date:** May 23, 2026  

---

# Part 1 — Secure Design Document Overview

## Project Description  
The Hiking Club Application is a web-based platform that supports the operations of a community hiking organization. It allows guests to browse upcoming trips, members to authenticate and register for events, and administrators to manage user accounts, trip schedules, and financial workflows. The system stores both public trip information and sensitive data such as medical notes and payment records. Because the application handles confidential information and role‑specific functionality, secure design practices are essential to ensure data protection, integrity, and proper access control.

## Organization Description  
The application is designed for a volunteer‑driven hiking club consisting of regular members, trip leaders, and system administrators. Members use the system to explore events and manage their profiles. Trip leaders create and manage hiking trips, track attendance, and review participation history. System administrators oversee account provisioning, financial operations, and platform integrity. The application serves as the central tool for coordinating club activities and managing sensitive operational data.

## Deployment Environment  
The Hiking Club Application will be deployed in a cloud‑hosted environment using a multi‑tier architecture. A publicly accessible frontend web server handles authentication, session management, and application logic. A backend relational database server resides in a private subnet that is not reachable from the public internet. Firewalls and security groups restrict traffic between network tiers, ensuring that only the frontend server can communicate with the database. All communication between clients and the frontend server uses HTTPS to protect data in transit.

## Secure Software Concepts  
Several secure software concepts apply to the Hiking Club Application. Strong authentication and role‑based authorization ensure that members, trip leaders, and administrators only access the features intended for their roles. Sensitive data such as medical notes and payment information must be protected using encryption and strict access controls. Input validation and parameterized queries help prevent injection attacks. Secure session handling—including session expiration, CSRF protection, and secure cookies—reduces the risk of unauthorized access. Logging and auditing support accountability for administrative actions. Network segmentation and private database isolation further reduce exposure to external threats.

---

# Part 2 — Threat Model Assessment

## Part 2A — Architecture Diagram

### Architecture Diagram  
MSSE642---2026Summer\Project 2\arch dia.png

### System Architecture Overview  
The Hiking Club Application uses a layered architecture that separates public‑facing components from internal systems. The design includes a public network for client access, a DMZ for the frontend web server, and a private internal network for the backend database. Multiple firewalls and trust boundaries ensure that sensitive systems remain isolated from the public internet.

### Network Components  
- **Guest Client (Browser)** — Public users browsing available trips  
- **Member Client (Browser)** — Authenticated users registering for events  
- **Admin Client (Browser)** — Trip leaders and system administrators performing privileged actions  
- **Front End Web Server** — Public‑facing application server located in the DMZ  
- **Backend Database Server** — Private relational database storing all application data  
- **Firewall #1 (Perimeter Firewall)** — Filters all inbound HTTPS traffic  
- **Firewall #2 (Internal Firewall)** — Restricts access to the private database network  
- **Public Network, DMZ Network, and Private Internal Network**  
- **Trust Boundaries** separating untrusted, semi‑trusted, and trusted zones  

### Network Layout

| Component | Network Zone | Example IP Address |
|----------|--------------|-------------------|
| Guest Client | Public Internet | Dynamic Public IP |
| Member Client | Public Internet | Dynamic Public IP |
| Admin Client | Public Internet | Dynamic Public IP |
| Front End Web Server | DMZ / Public‑Facing Network | 34.210.10.15 |
| Backend Database Server | Private Internal Network | 10.0.1.10 |

### Trust Boundaries  
1. **Public Internet → DMZ**  
   - All client traffic enters through Firewall #1  
   - Only HTTPS (port 443) is allowed  

2. **DMZ → Private Internal Network**  
   - The frontend server communicates with the database through Firewall #2  
   - Only database queries over TLS are permitted  

3. **Application Role Boundary**  
   - Admin, member, and guest clients share the same frontend but have different authorization levels  
   - Sensitive administrative operations are isolated logically within the application  

### Data Flow Description  
- Guests access public trip listings through the frontend server.  
- Members authenticate and register for events.  
- Trip leaders and administrators perform event management, reporting, and financial tasks.  
- The frontend server retrieves and updates data on the backend database.  
- The database server accepts traffic only from the frontend server through private networking rules.

---

## Part 2B — STRIDE Threat Model

### 1. Spoofing  
Attackers may attempt to impersonate legitimate users by stealing credentials or exploiting weak authentication. Successful spoofing could grant unauthorized access to member profiles or administrative tools. Strong password policies, MFA, and secure session handling help mitigate this risk.

### 2. Tampering  
An attacker could attempt to alter event data, registration records, or financial information by exploiting insecure input handling or insufficient authorization checks. Input validation, parameterized queries, and strict role‑based access control reduce the likelihood of tampering.

### 3. Repudiation  
Without proper logging, users could deny performing actions such as modifying events or updating financial records. Implementing detailed audit logs with timestamps and user identifiers ensures accountability and supports incident investigations.

### 4. Information Disclosure  
Sensitive data—including medical notes, private member information, and payment details—could be exposed through insecure access controls or unencrypted communication. HTTPS, encryption at rest, and strict role‑based access control help prevent unauthorized disclosure.

### 5. Denial of Service  
Attackers may attempt to overwhelm the frontend server with excessive traffic, disrupting access for legitimate users. Rate limiting, traffic filtering, and cloud‑based DDoS protection services can help maintain availability.

### 6. Elevation of Privilege  
A member might attempt to exploit authorization flaws to gain trip leader or administrator privileges. Enforcing server‑side authorization checks and validating permissions on every request helps prevent privilege escalation.

---

## Part 2C — OWASP Threat Model

### Assessment Scope  
The threat model covers all components of the Hiking Club Application, including user authentication, event management, member profiles, administrative tools, financial operations, and the underlying database. Key assets include personal information, medical data, payment records, and administrative controls.

### Vulnerabilities  
Potential vulnerabilities include weak authentication, broken access control, insufficient input validation, insecure session handling, and unencrypted communication. These weaknesses could lead to unauthorized access, data corruption, or exposure of sensitive information.

### Countermeasures  
Security controls should include strong password hashing, HTTPS enforcement, role‑based access control, input validation, parameterized SQL queries, and secure session management. Network segmentation and firewalls protect the backend database. Logging and monitoring help detect suspicious activity and support incident response.

### Prioritized Risks

| Priority | Risk | Impact |
|----------|------|--------|
| 1 | Unauthorized Administrative Access | High |
| 2 | Exposure of Confidential Medical Information | High |
| 3 | SQL Injection or Input Manipulation | High |
| 4 | Compromise of Payment Workflows | Medium |
| 5 | Denial of Service Attacks | Medium |
| 6 | Unauthorized Profile Changes | Low |

---

# Conclusion  
The Hiking Club Application requires strong security controls due to its handling of sensitive personal, medical, and financial information. By applying secure design principles, enforcing strict access control, isolating backend systems, and implementing robust logging and monitoring, the organization can significantly reduce security risks. Using STRIDE and OWASP methodologies ensures that threats are identified early and addressed systematically throughout the development lifecycle.