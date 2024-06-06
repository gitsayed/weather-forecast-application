package com.weather.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class FavouriteLocationDto  {

    private Integer id;
    private String name;
    private String  latitude;
    private String longitude;
    private String elevation;
    private String feature_code;
    private String country_code;
    private Integer admin1_id;
    private Integer admin2_id;
    private String timezone;
    private Integer country_id;
    private String country;
    private String admin1;
    private String admin2;
    private String username;
    private Integer user_id;
}
