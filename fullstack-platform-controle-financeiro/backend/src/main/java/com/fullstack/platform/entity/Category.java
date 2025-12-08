package com.fullstack.platform.entity;


import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Category {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


private String name;
private String type; // INCOME or EXPENSE
}