package com.fullstack.platform.controller;

import com.fullstack.platform.controller.dto.TransactionRequest;
import com.fullstack.platform.domain.Transaction;
import com.fullstack.platform.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return service.createFromRequest(request, 1L, 1L);
    }

    @PutMapping("/{id}")
    public Transaction update(
            @PathVariable Long id,
            @RequestBody TransactionRequest request
    ) {
        return service.updateFromRequest(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
