import http from "k6/http";
import type { Options } from "k6/options";
import { sleep, check } from "k6";

export const options: Options = {
  stages: [
    { duration: "10s", target: 80 },
    { duration: "25s", target: 10 },
    { duration: "20s", target: 45 },
    { duration: "50s", target: 45 },
    { duration: "10s", target: 100 },
    { duration: "10s", target: 0 },
  ],
};

export default () => {
  const res = http.get("http://test.k6.io");

  check(res, {
    "status code is 200": function (r) {
      return r.status === 200;
    },
    "content-type is html": function (r) {
      return r.headers["Content-Type"].includes("text/html");
    },
  });

  sleep(1);
};
