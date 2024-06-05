



export class GeoCity implements Model{

    id?: number;
    name?: string;
    latitude?: number;
    longitude?: number;
    elevation?: number;
    feature_code?: string;
    country_code?: string;
    admin1_id?: string;
    admin2_id?: string;
    timezone?: string;
    country_id?:  number;
    country?: string;
    admin1?: string;
    admin2?: string;
    constructor(){
        this.id=0;
        this.name='';
    
    }
}

export interface Model  {

}