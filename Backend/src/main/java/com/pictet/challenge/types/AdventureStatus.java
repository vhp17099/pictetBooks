package com.pictet.challenge.types;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class AdventureStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @OneToOne
    private Book book;

    @OneToOne
    private Section currentSection;

    private Integer currentHp;

    private List<Integer> visitedsections;

}
