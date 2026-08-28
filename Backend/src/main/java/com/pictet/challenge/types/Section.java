package com.pictet.challenge.types;

import com.pictet.challenge.types.enums.SectionType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer sectionKey;

    private Integer id;
    private String text;
    private SectionType type;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<Option> options = new ArrayList<>();

}
