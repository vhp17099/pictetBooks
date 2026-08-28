package com.pictet.challenge.types;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer optionKey;

    private String description;
    private Integer gotoId;

    @JsonProperty("consequence")
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Consequence> consequences;
}
