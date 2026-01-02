package com.fullstack.platform.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long accountId;
    private Long categoryId;

    private BigDecimal amount;

    @Column(nullable = false)
    private String type;

    private String description;

    @Column(nullable = false)
    private LocalDate occurredAt;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
