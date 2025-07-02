import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export let options = {
  duration: '60s',
  vus: 200,   // 200 concurrent users
};

export default function () {

  if (Math.random() < 0.5) {

    let res = http.post('http://localhost:3000/jobs', JSON.stringify({ sample: "test" }), {
      headers: { 'Content-Type': 'application/json' },
    });

    check(res, { 'POST /jobs status was 200': (r) => r.status === 200 });

  } 
  else {
    let res = http.get('http://localhost:3000/jobs/' + 'test-id-' + Math.floor(Math.random()*1000));
    check(res, { 'GET /jobs status was 200 or 404': (r) => r.status === 200 || r.status === 404 });
  }

  sleep(0.1); // short wait between requests
}
