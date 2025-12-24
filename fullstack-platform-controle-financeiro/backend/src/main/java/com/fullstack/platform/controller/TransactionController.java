package com.fullstack.platform.controller;

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

    // LISTAR
    @GetMapping
    public List<Transaction> list() {
        // depois ligamos ao usuário logado
        return service.findAll(1L);
    }

    // CRIAR
    @PostMapping
    public Transaction create(@RequestBody Transaction transaction) {
        transaction.setUserId(1L);
        transaction.setAccountId(1L);
        return service.save(transaction);
    }

    // EDITAR
    @PutMapping("/{id}")
    public Transaction update(@PathVariable Long id, @RequestBody Transaction transaction) {
        return service.update(id, transaction);
    }

    // EXCLUIR
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
