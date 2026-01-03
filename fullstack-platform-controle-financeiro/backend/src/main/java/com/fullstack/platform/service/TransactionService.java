package com.fullstack.platform.service;

import com.fullstack.platform.domain.Transaction;
import com.fullstack.platform.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository repository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    public Transaction create(Transaction transaction) {
        transaction.setCreatedAt(LocalDate.now());
        return repository.save(transaction);
    }

    public List<Transaction> findAll() {
        return repository.findAll();
    }

    public Transaction update(Long id, Transaction updated) {
        Transaction t = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        t.setTitle(updated.getTitle());
        t.setAmount(updated.getAmount());
        t.setType(updated.getType());
        t.setCategory(updated.getCategory());

        return repository.save(t);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
