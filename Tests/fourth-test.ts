import http from "k6/http";
import type { Options } from "k6/options";
import { sleep, check, group } from "k6";

export const options: Options = {
  stages: [
    { duration: "25s", target: 10 },
    { duration: "25s", target: 40 },
    { duration: "25s", target: 15 },
    { duration: "25s", target: 85 },
    { duration: "10s", target: 0 },
  ],

  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
    checks: ["rate>0.99"],
  },
};

export default () => {
  group("Homepage Load (GET)", function () {
    const res = http.get("http://test.k6.io");
    check(res, {
      "status code is 200": function (r) {
        return r.status === 200;
      },
      "Content-type is html": function (r) {
        return r.headers["Content-Type"].includes("text/html");
      },
    });
  });

  group("Browse Products (GET)", function () {
    const res = http.get("https://quickpizza.grafana.com");
    check(res, {
      "Status code is 200": function (r) {
        return r.status === 200;
      },
      "content-type is html": function (r) {
        return r.headers["Content-Type"]?.includes("text/html");
      },
      "Response time is less 1200ms": function (r) {
        return r.timings.duration <= 1200;
      },
    });
  });

  group("Create User (POST)", function () {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const payload = JSON.stringify({
      title: "morpheus",
      body: "leader",
      userId: 10,
    });
    const headers = {
      "Content-Type": "application/json",
    };
    const res = http.post(url, payload, { headers: headers });
    check(res, {
      "Status code is 201": function (r) {
        return r.status === 201;
      },
      "Contnet Type is JSON": function (r) {
        return r.headers["Content-Type"]?.includes("application/json");
      },
      "Response includes title": function (r) {
        if (typeof r.body === "string") {
          const body = JSON.parse(r.body);
          return body.title === "morpheus";
        }
        return false;
      },
      "Response include body": function (r) {
        if (typeof r.body === "string") {
          const body = JSON.parse(r.body);
          return body.body=== "leader";
        }
        return false;
      },
      "Response include userID": function (r) {
        if (typeof r.body === "string") {
          const body = JSON.parse(r.body);
          return body.userId === 10;
        }
        return false;
      },
    });
  });
  sleep(1);
};
