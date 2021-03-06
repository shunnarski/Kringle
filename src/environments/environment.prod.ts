import {HttpHeaders} from '@angular/common/http';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Accept-Language, Content-Language"
  })
}

export const environment = {
  production: true,
  nodeServer: "http://kringleserver-env-1.eba-8ztjvrpq.us-east-2.elasticbeanstalk.com/"
};
