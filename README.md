# K6 Performance Testing Examples

This repository contains my beginner-to-intermediate K6 load testing practice scripts. These tests simulate traffic, validate API responses, and demonstrate how to structure K6 scripts for real-world scenarios.

---

## Test File Index

### 01-basic-status-check.test.js
A minimal K6 test that performs a simple GET request to `https://test.k6.io` and checks for a 200 OK response.

### 02-grafana-load-ramp-test.js
A staged load test simulating a ramp-up and ramp-down pattern targeting the public Grafana QuickPizza demo site.

### 03-k6-ramp-spike-pattern.ts
A more advanced test showcasing complex load stages including spike testing and plateau scenarios.

### 04-end-to-end-api-load-check.ts
A grouped scenario test including:
- `GET` homepage load
- `GET` product browsing
- `POST` user creation (with JSON validation)
- Thresholds for SLA checks

---

## Tech Stack

- [K6](https://k6.io/) v1.0
- JavaScript / TypeScript (depending on file)
- CLI run: `k6 run Tests/<filename>`

---

## Next Steps (Planned)

- Parameterization with `.csv` or `.json`
- Grafana Cloud integration once K6 v1.x supports remote write
- GitHub Actions CI/CD integration

---

## Author

[Dilan Meegoda](https://www.linkedin.com/in/dilan-meegoda/)  
Medium: [@dilanmeegoda](https://medium.com/@dilanmeegodavithana)

---


