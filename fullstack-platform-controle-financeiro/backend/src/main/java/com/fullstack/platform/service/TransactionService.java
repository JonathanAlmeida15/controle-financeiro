package com.fullstack.platform.service;

import com.fullstack.platform.domain.Transaction;
import com.fullstack.platform.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository repository;

    public Transaction save(Transaction transaction) {
        return repository.save(transaction);
    }

    public List<Transaction> findAll(Long userId) {
        return repository.findByUserId(userId);
    }

    public Transaction update(Long id, Transaction updated) {
        Transaction t = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada"));

        t.setAmount(updated.getAmount());
        t.setDescription(updated.getDescription());
        t.setType(updated.getType());
        t.setOccurredAt(updated.getOccurredAt());
        t.setCategoryId(updated.getCategoryId());

        return repository.save(t);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
