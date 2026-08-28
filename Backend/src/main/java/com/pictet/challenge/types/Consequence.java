package com.pictet.challenge.types;

import com.pictet.challenge.types.enums.ConsequenceType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Consequence {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer consequenceKey;

    private ConsequenceType type;

    @Column(name = "consequence_value")
    private int value;
    private String text;
}
