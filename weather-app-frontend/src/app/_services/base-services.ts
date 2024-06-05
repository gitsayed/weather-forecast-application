import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";






@Injectable({
    providedIn: 'root'
  })
export class BaseService {

    headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    public mapToHttpParams(map: Map<string, any>) : any {
        let params = '?';
        if (map != null && map.size > 0) {
            map.forEach(( v, k) => {
                params += k.toString() + '=' + v.toString() + '&'
                // console.log(params);
            });
        }
        return params;
    }

 
}

