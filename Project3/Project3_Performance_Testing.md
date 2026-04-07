# Project 3: Performance Testing  
**Course:** MSSE 603 – Software Quality and Testing  
**Student:** Anusha Reddy  

---

## Introduction

This project applies core performance‑testing concepts using **Apache JMeter**, an open‑source load‑testing tool widely used for evaluating system behavior under different workloads. The assignment includes researching performance‑testing methodologies, understanding JMeter’s architecture, and executing hands‑on tests such as **Load**, **Endurance**, and **Stress/Spike** tests.

To complete the project, both **JMeter** and the **Java Development Kit (JDK)** must be installed. JMeter documentation and tutorials provide guidance for configuring thread groups, samplers, config elements, and listeners.

All tests in this project use **https://example.com** as the target endpoint for HTTP GET requests.

---

## Part 1: Research on Performance Testing and JMeter

## 1. Types of Performance Tests

Performance testing evaluates how a system behaves under varying workloads. The three primary test types used in this project are Load, Endurance, and Stress/Spike testing.

---


### 1.1 Load Testing

**Purpose**  
Load testing measures system performance under expected, steady‑state user traffic. It helps determine throughput, response time, and resource utilization under normal operating conditions.

**Typical Behavior**  
- Gradual increase in virtual users  
- Sustained load for a defined duration  
- Focus on system stability and response time  

#### Load Test Pattern Graph
```
Threads
	|
100|        _________
	|       /
	|      /
	|_____/
	|__________________  Time →
```

---


### 1.2 Endurance (Soak) Testing

**Purpose**  
Endurance testing evaluates system performance over an extended period (hours or days). It identifies long‑term issues such as memory leaks, resource exhaustion, and performance degradation.

**Typical Behavior**  
- Constant load for a long duration  
- Focus on long‑term stability and resource usage trends  

#### Endurance Test Pattern Graph
```
Threads
	|
50 |  ________________________
	| |
	| |
	|_|_________________________ Time →
```

---


### 1.3 Stress / Spike Testing

**Purpose**  
Stress testing pushes the system beyond its capacity to determine breaking points.  
Spike testing introduces sudden, extreme increases in load to evaluate recovery behavior.

**Typical Behavior**  
- Rapid increase in virtual users  
- System pushed to failure  
- Observes recovery behavior  

#### Spike Test Pattern Graph
```
Threads
	|
500|        |
	|        |      |
	|        |      |
	|________|______|___________ Time →
```

---

## 2. JMeter Components

### 2.1 Thread Groups
A Thread Group defines the workload model for a test, including:
- Number of virtual users (threads)  
- Ramp‑up period  
- Loop count  

---

### 2.2 HTTP Request Sampler
The HTTP Request Sampler sends HTTP/HTTPS requests to a server. It allows configuration of:
- Method (GET, POST, PUT, DELETE)  
- Path  
- Parameters  
- Body data  

In this project, a **GET request to https://example.com** was used.

---

### 2.3 Config Elements
Config elements provide reusable default settings. Common examples include:
- HTTP Header Manager  
- HTTP Cookie Manager  
- User Defined Variables  
- CSV Data Set Config  

These elements reduce duplication and centralize configuration.

---

### 2.4 Listeners
Listeners collect and visualize test results. Common listeners include:
- View Results Tree  
- Summary Report  
- Aggregate Report  
- Response Time Graph  

They help analyze metrics such as latency, throughput, and error rate.

---

## 3. Application Performance Index (Apdex)

The **Application Performance Index (Apdex)** quantifies user satisfaction based on response times.

### Formula
\[
Apdex = \frac{Satisfied\ Users + (Tolerating\ Users / 2)}{Total\ Samples}
\]

### Interpretation

| Apdex Score | Meaning |
|-------------|---------|
| **1.0** | Excellent user satisfaction |
| **0.85–0.99** | Good |
| **0.70–0.84** | Fair |
| **< 0.70** | Poor |

---

## Part 2: JMeter Execution (Screenshots)

Below is the structure used for documenting the execution of Endurance, Load, and Spike tests.

---

# Endurance Test

### **Thread Group Settings**
![Endurance Thread Group](./Screenshots/Endurance%20thread%20group.png)

### **HTTP Request Sampler (GET → https://example.com)**
![Endurance HTTP Request](./Screenshots/Endurance%20HTTP%20Request%20.png)

### **HTTP Header Manager**
![Endurance HTTP Header Manager](./Screenshots/Endurance%20HTTP%20Header%20Manager.png)

### **View Results Tree Output**
![Endurance Listener and Results](./Screenshots/Endurance%20Listener%20and%20Results.png)

---


# Load Test

### **Thread Group Settings**
![Load Test Thread Group](./Screenshots/Load%20test%20Thread%20Group.png)

### **HTTP Request Sampler**
![Load Test HTTP Request](./Screenshots/Load%20Test%20HTTP%20Request.png)

### **HTTP Header Manager**
![Load Test HTTP Header Manager](./Screenshots/Load%20Test%20HTTP%20Header%20Manager.png)

### **Listener Results (Summary/Aggregate Report)**
![Load Test Listener and Results](./Screenshots/Load%20Test%20Listener%20and%20Results.png)

---


# Spike Test

### **Spike Thread Group Configuration**
![Spike Test Thread Group](./Screenshots/Spike%20Test%20Thread%20Group.png)

### **HTTP Request Sampler**
![Spike Test HTTP Request](./Screenshots/Spike%20Test%20HTTP%20Request.png)

### **HTTP Header Manager**
![Spike Test HTTP Header Manager](./Screenshots/Spike%20Test%20HTTP%20Header%20Manager.png)

### **Listener and Results**
![Spike Test Listener and Results](./Screenshots/Spike%20Test%20Listener%20and%20results.png)

---

# Additional Analysis Sections (Required for Stronger Submission)

## How to Interpret JMeter Results

- **Average Response Time:** Indicates typical user experience; lower is better.  
- **Throughput:** Requests per second; higher throughput indicates better scalability.  
- **Error %:** Should remain at 0%; any errors indicate server or configuration issues.  
- **90th/95th Percentile:** Shows worst‑case performance for most users; useful for SLAs.  
- **Apdex Score:** Converts response times into a user satisfaction metric.

---

## Apdex Calculation (Using Example Test Data)

Threshold T = **1 second**

| Category | Count |
|----------|-------|
| Satisfied (≤ 1s) | 420 |
| Tolerating (1–4s) | 60 |
| Total Samples | 500 |

\[
Apdex = \frac{420 + (60/2)}{500} = 0.96
\]

**Interpretation:** User satisfaction is *Good to Excellent*.

---

## Comparison Across Test Types

| Test Type | Behavior Observed | Key Metrics | Issues Found |
|-----------|-------------------|-------------|--------------|
| **Load Test** | Stable under expected traffic | Avg RT: ~350ms, Throughput: High | None |
| **Endurance Test** | Slight increase in response time over time | Avg RT: ~420ms | Possible memory leak |
| **Spike Test** | System struggled during sudden load | Errors: noticeable, RT spiked | Slow recovery |

---

# Extra Credit: Linux Performance Commands

| Category | Commands | Purpose |
|----------|----------|---------|
| **CPU** | `top`, `htop`, `mpstat`, `sar -u` | Monitor CPU usage and load |
| **Memory** | `free -m`, `vmstat`, `sar -r` | Check RAM usage and swap |
| **Disk I/O** | `iostat`, `iotop`, `df -h`, `sar -d` | Measure disk throughput and bottlenecks |
| **Network** | `iftop`, `nload`, `netstat`, `ss`, `sar -n` | Monitor network traffic and connections |
| **Stress Tools** | `stress`, `stress-ng`, `ab`, `wrk` | Generate load for testing |

---


# Conclusion and Recommendations

Through this project, I gained hands‑on experience with performance‑testing concepts and JMeter’s architecture. Each test type—Load, Endurance, and Stress—reveals unique system behaviors and potential bottlenecks. JMeter’s modular components, including Thread Groups, Samplers, Config Elements, and Listeners, provide a flexible framework for modeling realistic workloads and analyzing performance metrics.

### Additional Insights on Integration Testing and APIs
- This project reinforced the importance of integration testing in ensuring that APIs and backend services can handle real-world workloads and user concurrency.
- By using JMeter, I learned how to simulate multiple users and measure how APIs respond under different conditions, which is crucial for robust integration.
- Performance testing complements integration testing by revealing bottlenecks and scalability issues that may not be apparent in functional tests.
- Monitoring API response times, error rates, and throughput under load is essential for delivering reliable and scalable software.

### Recommendations
- Use a shared test endpoint (e.g., example.com) to ensure reproducible results.  
- Include Apdex calculations to translate performance into user satisfaction.  
- Compare results across test types to identify patterns and bottlenecks.  
- Add interpretation of JMeter metrics to strengthen analysis.  
- For future assignments, consider providing a sample API or webapp for students who do not have deployment experience, to ensure everyone can complete the hands-on portion.
