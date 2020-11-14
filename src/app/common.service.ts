import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  decodeHTML(html: string) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  truncateText(txt: string) {
    const LIMIT = 30;
    const TAIL = "..."
    return txt.length > LIMIT ? txt.substr(0, LIMIT) + TAIL : txt;
  }

}
