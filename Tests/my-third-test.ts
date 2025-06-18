import http from "k6/http";
import type { Options } from "k6/options";
import { sleep, check, group } from "k6";

export const options: Options = {
  stages: [
    { duration: "10s", target: 80 },
    { duration: "25s", target: 10 },
    { duration: "20s", target: 45 },
    { duration: "50s", target: 45 },
    { duration: "10s", target: 100 },
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
      "Response time is less 1000ms": function (r) {
        return r.timings.duration <= 1000;
      },
    });
  });

  group("Create User (POST)", function () {
    const url = "https://reqres.in/api/users";
    const payload = JSON.stringify({
      name: "morpheus",
      job: "leader",
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
      "Response includes name": function (r) {
        if (typeof r.body === "string") {
          try {
            const body = JSON.parse(r.body);
            return body.name === "morpheus";
          } catch (e) {
            console.error("JSON parse failed:", e.message);
            return false;
          }
        }
        return false;
      },
    });
  });
  sleep(1);
};
