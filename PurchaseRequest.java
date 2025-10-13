package com.example.demo.entities;

public class PurchaseRequest {
    private int productId;
    private String userId;
    private String username; // Optional

    // Getters and Setters
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

	@Override
	public String toString() {
		return "PurchaseRequest [productId=" + productId + ", userId=" + userId + ", username=" + username + "]";
	}
    
}

