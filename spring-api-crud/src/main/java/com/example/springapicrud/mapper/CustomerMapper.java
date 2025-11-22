package com.example.springapicrud.mapper;

import com.example.springapicrud.dto.CreateCustomerDTO;
import com.example.springapicrud.dto.CustomerDTO;
import com.example.springapicrud.entity.Customer;

public class CustomerMapper {
    public static Customer toEntity(CreateCustomerDTO dto){
        Customer c = new Customer();
        c.setName(dto.getName());
        c.setEmail(dto.getEmail());
        c.setPhone(dto.getPhone());
        return c;
    }

    public static CustomerDTO toDto(Customer c){
        CustomerDTO dto = new CustomerDTO();
        dto.setId(c.getId());
        dto.setName(c.getName());
        dto.setEmail(c.getEmail());
        dto.setPhone(c.getPhone());
        dto.setCreatedAt(c.getCreatedAt());
        return dto;
    }
}
