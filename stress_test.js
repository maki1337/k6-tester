import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "2m", target: 100 },
    { duration: "5m", target: 100 },
    { duration: "2m", target: 200 },
    { duration: "5m", target: 200 },
    { duration: "2m", target: 300 },
    { duration: "5m", target: 300 },
    { duration: "2m", target: 400 },
    { duration: "5m", target: 400 },
    { duration: "10m", target: 0 }, // Scale down recovery stage
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"], // request failure rate should be less than 1%
    http_req_duration: ["p(95)<500"], // 95% of requests should complete below 500ms
  },
};

export default function () {
  let subjectId = "646a727b775fbce3d465486f"; // Replace this with the actual subject ID
  let res = http.get(`https://api.studlee.io/homeworks/${subjectId}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkMDNhZTdmNDczZjJjNmIyNTI3NmMwNjM2MGViOTk4ODdlMjNhYTkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWF0ZXbFviBNYWsiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YlVJRFVlamVGRGNoc1BucUpUakRkUHVDMEQ2amVvd0Fnb3I1akk1UT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9teXN0dWRsZWUtdGVzdCIsImF1ZCI6Im15c3R1ZGxlZS10ZXN0IiwiYXV0aF90aW1lIjoxNjg3Njk1NjU0LCJ1c2VyX2lkIjoiUG8xaWN1eURETVBrNjBuSm1qZUlla0lFN1FIMyIsInN1YiI6IlBvMWljdXlERE1QazYwbkptamVJZWtJRTdRSDMiLCJpYXQiOjE2ODc2OTU2NTQsImV4cCI6MTY4NzY5OTI1NCwiZW1haWwiOiJtYXRldnoubWFrQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEyMjYyMDcwMTgzMTY5MzgwNTEwIl0sImVtYWlsIjpbIm1hdGV2ei5tYWtAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.YKvIjc2ph2cqLPyK35Jp8dE_oNsK9OY29GwkgfSVkL4F2zhSrsIlSy59z0CyxguoBSBF0Iohrg5PQ7xUWzGujQ8cRUAjtv_jMUAs0jFwlRJB9mPA77dZl9dnUMS8PKXAg9SjVUTb560XK8fEd9XZlNHFxQfcViCHv4Xc2W4fyaUXcPD6VhBEPCGZzzYnp1HZBgKRrmCDzLwjj8QcGsmthFN1TfOqylSWkEzOwIRTBPEmJ1etTG3ACMBL5AgKUiJ3hYTo20IwVaJV-2j2qTOyeQE3vGpt02QfUkFIdrUYSn_MPa6SDXE84ofSM1vRzZkKWDF7fLAtY8yz9feyFfGK7g", // Replace this with the actual auth token
    },
  });
  // Log response for debug purposes
  console.log("Response status: ", res.status);
  //console.log("Response body: ", res.body);

  sleep(1); // pause for 1 second between requests
}
