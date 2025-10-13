
package com.example.demo.controller;

import com.example.demo.entities.Product;
import com.example.demo.repos.ProductRepository;
import com.example.demo.service.ProductServices;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ProductController {

    @Autowired
    private ProductServices productService;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/save")
    public ResponseEntity<String> saveProduct(@RequestBody Product product) {
        productService.save(product);
        return ResponseEntity.ok("Product saved successfully!");
    }

    @GetMapping("/allprod")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getall());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Product product = productService.getProductById(id);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestBody Product product) {
        productService.editp(id, product);
        return ResponseEntity.ok("Product updated successfully!");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        productService.delete(id);
        return ResponseEntity.ok("Product deleted successfully!");
    }

    @PutMapping("/buybook")
    public ResponseEntity<Product> buyBook(@RequestBody Product reqProduct) {
        Optional<Product> existing = productRepository.findById(reqProduct.getId());
        if (existing.isPresent()) {
            Product p = existing.get();
            if (p.getUser() == null || p.getUser().isEmpty()) {
                p.setUser(reqProduct.getUser());
                return ResponseEntity.ok(productRepository.save(p));
            } else {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/create-order")
    public ResponseEntity<String> createOrder(@RequestBody Map<String, Object> data) {
        try {
            RazorpayClient client = new RazorpayClient("rzp_test_6SENyDD1PJRpPu", "1E0j6hCiTh4dpiWVa8dq3kzs");
            int amount = (int) data.get("amount");

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

            Order order = client.orders.create(orderRequest);
            return ResponseEntity.ok(order.toString());

        } catch (RazorpayException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating Razorpay order");
        }
    }
}