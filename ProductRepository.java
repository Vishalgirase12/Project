package com.example.demo.repos;

 
import com.example.demo.entities.Product;
 
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


public interface ProductRepository extends CrudRepository<Product, Integer> {
     
}
