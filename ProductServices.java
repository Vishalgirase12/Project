package com.example.demo.service;

import java.util.List;

import com.example.demo.entities.Product;

public interface ProductServices  {

	void save(Product p);

	List<Product> getall();

	void delete(int id);

	void editp(int id, Product p);

	Product getProductById(Integer id);

 

	 
//
//	 
//
//	void buyProduct(Integer productId, String string);
//
//	void returnProduct(int productId, String userId);

 

 
   
	}
	 
