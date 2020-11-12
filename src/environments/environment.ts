// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {EtsyAPISecrets} from '../../envs_ts';
import {HttpHeaders} from '@angular/common/http';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Accept-Language, Content-Language"
  })
}

export const environment = {
  production: false,
  nodeServer: "http://localhost:8080/"
};

export const etsyAPI = {
  production: false,
  key: "?api_key=" + EtsyAPISecrets.keystring,
  etsyAPIListingInfoURL: "https://openapi.etsy.com/v2/listings/",
  etsyAPIListingImageURL: "https://openapi.etsy.com/v2/listings/:listing_id/images"
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
