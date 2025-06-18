import http from 'k6/http';
import type { Options } from 'k6/options';
import {sleep} from 'k6';


export const options: Options = {
    vus: 3,
    //iterations: 100,
    stage: [
        {duration: '10s', target: 80},
        {duration: '25s', target: 10},
        {duration: '20s', target: 45},
        {duration: '50s', target: 45},
        {duration: '10s', target: 100},
        {duration: '10s', target: 0},
    ]
}

export default () => {
    http.get('http://test.k6.io');
    sleep(1);
}

