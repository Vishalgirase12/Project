package com.example.demo.dao;

import com.example.demo.entities.Product;
import com.example.demo.repos.ProductRepository;
import com.example.demo.service.ProductServices;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

@Service
public class ProductDao implements ProductServices {

	@Autowired
	ProductRepository prepo;

	@Override
	public void save(Product p) {
	    prepo.save(p); // ✅ This line is missing in your original code
	}


	@Override
	public List<Product> getall() {

		List<Product> li = (List<Product>) prepo.findAll();
		return li;
	}

	@Override
	public void delete(int id) {
		prepo.deleteById(id);
		
	}

	@Override
	public void editp(int id, Product p) {
		Product p1 = prepo.findById(id).get();
		p1.setId(id);      //  Don't set id
		p1.setName(p.getName());
		p1.setCategory(p.getCategory());
		p1.setPrice(p.getPrice());
		 p1.setUser(p.getUser());
		prepo.save(p1);    // after edit save data
		
	}


 

 
	@Override
    public Product getProductById(Integer id) {
        return prepo.findById(id).orElse(null);
	}

	 

	 

}
