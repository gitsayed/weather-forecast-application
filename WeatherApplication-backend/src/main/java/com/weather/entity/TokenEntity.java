package com.weather.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.io.Serializable;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "access_tokens"
      )
public class TokenEntity implements Serializable {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      @Column(name = "id")
      private Integer id;

      @Column(name = "access_token")
      private String accessToken;

      @Column(name = "refresh_token")
      private String refreshToken;

      @Column(name = "token_expires_at")
      private Timestamp tokenExpiresAt;

      @Column(name = "logged_out")
      private boolean loggedOut;

      @Column(name = "logged_out_at")
      private Timestamp loggedOutAt;

      @Column(name = "logged_In_at")
      private Timestamp loggedInAt;

      @ManyToOne
      @JoinColumn(name = "user_id")
      private UserEntity user;

      @CreationTimestamp
      private Timestamp createdOn;

      @UpdateTimestamp
      private Timestamp updatedOn;
}
