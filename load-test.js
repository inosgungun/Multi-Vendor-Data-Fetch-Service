import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

// Store request_ids across VUs (simple shared array)
let requestIds = [];

export let options = {
  duration: '60s',
  vus: 200,
};

export default function () {
  if (Math.random() < 0.5 || requestIds.length === 0) {
    // POST /jobs
    let res = http.post('http://api:3000/jobs', JSON.stringify({ sample: "test" }), {
      headers: { 'Content-Type': 'application/json' },
    });
    check(res, { 'POST /jobs status was 200': (r) => r.status === 200 });
    if (res.status === 200) {
      let json = res.json();
      if (json && json.request_id) {
        requestIds.push(json.request_id);
      }
    }
  } else {
    // Pick random ID we previously created
    let randomId = requestIds[Math.floor(Math.random() * requestIds.length)];
    let res = http.get(`http://api:3000/jobs/${randomId}`);
    check(res, { 'GET /jobs status was 200 or 404': (r) => r.status === 200 || r.status === 404 });
  }

  sleep(0.1);
}
