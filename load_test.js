import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "5m", target: 100 }, // 5m prej
    { duration: "10m", target: 100 }, // stay with 100 users for 10min
    { duration: "5m", target: 0 }, // ramp down to 0 users
  ],
  summaryTrendStats: ["avg", "min", "med", "max", "p(90)", "p(95)", "p(99)"],
  thresholds: {
    http_req_failed: ["rate<0.01"], // request failure rate should be less than 1%
    http_req_duration: ["p(99)<200"], // 95% of requests should complete below 500ms
  },
};

export default function () {
  let subjectId = "646a727b775fbce3d465486f"; // Replace this with the actual subject ID
  let res = http.get(`http://localhost:3000/homeworks/${subjectId}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkMDNhZTdmNDczZjJjNmIyNTI3NmMwNjM2MGViOTk4ODdlMjNhYTkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWF0ZXbFviBNYWsiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YlVJRFVlamVGRGNoc1BucUpUakRkUHVDMEQ2amVvd0Fnb3I1akk1UT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9teXN0dWRsZWUtdGVzdCIsImF1ZCI6Im15c3R1ZGxlZS10ZXN0IiwiYXV0aF90aW1lIjoxNjg3NzY3MDMwLCJ1c2VyX2lkIjoiUG8xaWN1eURETVBrNjBuSm1qZUlla0lFN1FIMyIsInN1YiI6IlBvMWljdXlERE1QazYwbkptamVJZWtJRTdRSDMiLCJpYXQiOjE2ODc3NjcwMzAsImV4cCI6MTY4Nzc3MDYzMCwiZW1haWwiOiJtYXRldnoubWFrQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEyMjYyMDcwMTgzMTY5MzgwNTEwIl0sImVtYWlsIjpbIm1hdGV2ei5tYWtAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.j4Hih8bdj_eu_tjl0qJpPvDND1rNMrKwbprDgTRKDg3x9zBFadeIQcN6if0QxM_ElUdaVMfdDps0Sm5Y4kFQHpMm21L5MRXD8TCSKfMDrDZvmceVTk1xTrNwbYs1Wj0jCPTaZpVrkytCpcKiq4yozrDLLaNCxyP28lEFYRUXGvjkxIDW_ay4TIFoA3zJ6NBuzIX9UeHsQjgi5iq83759kWOmvPXzq3rOgSbpq2P22tDU4Q3SaVd4vLb-34xXSjGAHIoQbsQn2eTx-bNp-sPa8JAy2HESYAOFe0lycdkGFeTSzMRkstWlCBlfbTUb5SSRZoJtCLcmXhgEUR1eBKHFTA",
    },
  });
  // Log response for debug purposes
  console.log("Response status: ", res.status);
  //console.log("Response body: ", res.body);

  sleep(1); // pause for 1 second between requests
}

/*export function handleSummary(data) {
  if (
    data.metrics.http_req_failed.rate < 0.01 ||
    data.metrics.http_req_duration.p(99) < 200
  ) {
    console.log(JSON.stringify(data));
  }
}*/
