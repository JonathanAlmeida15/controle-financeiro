package com.fullstack.platform.controller;

import com.fullstack.platform.domain.Transaction;
import com.fullstack.platform.service.TransactionService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService service;

    @GetMapping
    public List<Transaction> list() {
        return service.findAll(1L);
    }

    @PostMapping
    public Transaction create(@RequestBody TransactionRequest request) {
        Transaction t = new Transaction();
        t.setDescription(request.getDescription());
        t.setAmount(request.getAmount());
        t.setType(request.getType());
        t.setOccurredAt(request.getOccurredAt());
        t.setCategoryId(request.getCategoryId());
        t.setUserId(1L);
        t.setAccountId(1L);

        return service.save(t);
    }

    @PutMapping("/{id}")
    public Transaction update(@PathVariable Long id, @RequestBody TransactionRequest request) {
        return service.updateFromRequest(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

/* DTO */
@Data
class TransactionRequest {
    private String description;
    private Double amount;
    private String type; // INCOME | EXPENSE
    private Long categoryId;
    private LocalDate occurredAt;
}
