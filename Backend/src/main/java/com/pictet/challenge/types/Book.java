package com.pictet.challenge.types;

import com.fasterxml.jackson.annotation.JsonView;
import com.pictet.challenge.types.enums.BookDifficulty;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonView(Views.Summary.class)
    private Integer id;

    @JsonView(Views.Summary.class)
    private String title;

    @JsonView(Views.Summary.class)
    private String author;

    @JsonView(Views.Summary.class)
    private BookDifficulty difficulty;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonView(Views.Detail.class)
    private List<Section> sections;


}
