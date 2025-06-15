import http from 'k6/http';
import {sleep} from 'k6';

export default () => {
    http.get('http://test.k6.io');
    sleep(1);
}

