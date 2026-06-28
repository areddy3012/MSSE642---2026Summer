# MSSE642 — Final Projects Representation
# Student Name : Anusha Reddy
# Professor Name : Randall Granier

# Projects 1–4 and Security Vulnerability Analysis Summary



# Project 1 — PenLab Setup and Reconnaissance

## Overview

Project 1 established the penetration testing lab using Kali Linux and Metasploitable2. The goal was to configure a safe, isolated environment for reconnaissance, scanning, and vulnerability exploration.

## Objectives

- Install and configure Kali Linux

- Deploy Metasploitable2

- Validate network connectivity

- Perform initial reconnaissance

# Environment Setup

\ VirtualBox used for both virtual machines

- Kali Linux configured with NAT and Host-Only adapters

- Metasploitable2 configured with Host-Only adapter

- Connectivity verified using:

\`\`\`bash

ping <metasploitable-ip>

**Reconnaissance**

-   Ran service enumeration using:

bash

nmap -sV -O <target-ip>

-   Identified vulnerable services:
    -   FTP (vsftpd)
    -   SSH
    -   Telnet
    -   Apache
    -   MySQL
    -   RPC services

**Key Findings**

-   Multiple intentionally vulnerable services were exposed
-   Clear attack surface for future exploitation

**Challenges**

-   Network adapter mismatch resolved by reconfiguring adapters
-   Ping failure resolved by resetting Host-Only network

**Conclusion**

Project 1 successfully delivered a functioning penetration testing lab and a baseline for further security analysis.

# Project 2 — Threat Analysis and Vulnerability Enumeration**

**Overview**

Project 2 focused on threat modeling and vulnerability enumeration using STRIDE, OWASP, and scanning tools.

**Objectives**

-   Perform STRIDE threat modeling
-   Identify high-risk services
-   Map vulnerabilities to OWASP Top 10 categories

**STRIDE Threat Modeling Examples**

-   Spoofing: Weak SSH configuration
-   Tampering: Writable web directories
-   Repudiation: No logging or auditing
-   Information Disclosure: Anonymous FTP access
-   Denial of Service: Multiple exposed services
-   Elevation of Privilege: Misconfigured MySQL

**Tools Used**

-   nmap
-   searchsploit
-   nikto
-   enum4linux

**Sample Findings**

-   vsftpd 2.3.4 backdoor vulnerability
-   Outdated Drupal CMS with known CVEs
-   MySQL weak credentials
-   Tomcat Manager default login credentials

**OWASP Mapping**

-   Broken Access Control: Tomcat Manager
-   Cryptographic Failures: Cleartext services
-   Injection: DVWA SQL Injection
-   Logging Failures: No audit logs

**Conclusion**

Project 2 produced a clear threat model and vulnerability map for exploitation in later projects.

# Project 3 — PenLab Scanning and Exploitation (SYN Scan)**

**Overview**

Project 3 focused on SYN scanning and validating vulnerabilities discovered earlier.

**Objectives**

-   Run SYN scans
-   Analyze service versions
-   Validate vulnerabilities
-   Document findings

**SYN Scan Command**

bash

nmap -sS -T4 -p- <target-ip>

**Results Summary**

-   Port 21: FTP (Anonymous login enabled)
-   Port 22: SSH (Weak configuration)
-   Port 23: Telnet (Cleartext credentials)
-   Port 80: HTTP (Vulnerable web applications)
-   Port 3306: MySQL (Weak password)

**Vulnerability Validation**

-   FTP anonymous login confirmed
-   MySQL root/no password confirmed
-   Drupal exploitability confirmed
-   Tomcat default credentials confirmed

**Exploitation Example**

bash

msfconsole

use exploit/unix/ftp/vsftpd\_234\_backdoor

set RHOST <target-ip>

run

**Recommendations**

-   Disable anonymous FTP
-   Enforce SSH key authentication
-   Remove outdated web applications
-   Enable logging and monitoring

**Conclusion**

Project 3 validated multiple critical vulnerabilities and demonstrated successful exploitation using industry-standard tools.

# Project 4 — PenLab Exploitation and Reporting (Advanced)**

**Overview**

Project 4 expanded exploitation techniques and required producing a professional penetration testing report.

**Objectives**

-   Perform targeted exploitation
-   Capture evidence
-   Produce structured penetration testing report

**Web Application Exploits**

-   DVWA SQL Injection
-   Command Injection
-   File Upload bypass

**Service Exploits**

-   vsftpd backdoor
-   Samba enumeration
-   MySQL credential extraction

**Privilege Escalation**

-   Kernel exploit identified using searchsploit
-   Root access achieved on Metasploitable2

**Evidence Collected**

-   SQL injection screenshots
-   Reverse shell sessions
-   Privilege escalation evidence
-   Root file system access

**Reporting Structure**

-   Executive Summary
-   Scope and Methodology
-   Findings
-   Evidence
-   Risk Ratings
-   Recommendations

**Key Findings**

-   Full system compromise was possible
-   Privilege escalation was trivial
-   Weak configurations existed across multiple services

**Conclusion**

Project 4 demonstrated full compromise of the target system and produced a complete penetration testing report suitable for stakeholders.

**Security Vulnerability Analysis Summary (All Projects)**

**Critical Vulnerabilities Identified**

-   Anonymous FTP access
-   Outdated Drupal CMS
-   Weak MySQL credentials
-   Default Tomcat Manager login
-   Multiple exploitable kernel vulnerabilities

**Impact**

-   Remote code execution
-   Privilege escalation
-   Full system compromise

**Recommended Remediation**

-   Patch operating system and services
-   Remove vulnerable applications
-   Enforce least privilege
-   Implement network segmentation
-   Enable logging and continuous monitoring
