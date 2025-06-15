import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    vus: 10,
    stages: [
        { duration: '30s', target: 20 },
        { duration: '1m30s', target: 10 },
        { duration: '15s', target: 5 },
        { duration: '30s', target: 15 },
        { duration: '20s', target: 0 },
    ]
}

export default () => {
    http.get('https://quickpizza.grafana.com/');
    sleep(1);
}