package com.weather.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "favourite_location")
public class FavouriteLocationEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @CreationTimestamp
    private Timestamp createdOn;
    @UpdateTimestamp
    private Timestamp updatedOn;

    private String createdBy;
    private Timestamp updatedBy;

    private Integer locationId;
    private String name;
    private String latitude;
    private String  longitude;
    private String elevation;
    private String featureCode;
    private String countryCode;
    private Integer admin1Id;
    private Integer admin2Id;
    private String timezone;
    private Integer countryId;
    private String country;
    private String admin1;
    private String admin2;



}
