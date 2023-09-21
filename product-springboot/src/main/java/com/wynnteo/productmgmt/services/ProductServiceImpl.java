package com.wynnteo.productmgmt.services;

import java.lang.reflect.Type;
import java.security.Principal;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import com.wynnteo.productmgmt.dto.ProductDto;
import com.wynnteo.productmgmt.entity.Product;
import com.wynnteo.productmgmt.exception.ResourceNotFoundException;
import com.wynnteo.productmgmt.repository.ProductRepository;

@Service("productService")
public class ProductServiceImpl implements ProductService{

    @Autowired
	ProductRepository productRepository;

    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        logger.info("Creating product: {}", productDto);

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Product product = modelMapper.map(productDto, Product.class);
        productRepository.save(product);

        return modelMapper.map(product, ProductDto.class);
    }

    @Override
    public List<ProductDto> getAllProducts() {
        logger.info("Fetching all products");
        List<Product> productList = (List<Product>) productRepository.findAll();

        Type listType = new TypeToken<List<ProductDto>>() {}.getType();

        return new ModelMapper().map(productList, listType);
    }

    @Override
    public List<ProductDto> getProductsByStoreId(String storeId) {
        logger.info("Fetching products by store ID: {}", storeId);
        List<Product> productList = productRepository.findByStoreId(storeId);
        Type listType = new TypeToken<List<ProductDto>>() {}.getType();
        return new ModelMapper().map(productList, listType);
    
    }

    @Override
    public ProductDto getProductById(Long id) {
        logger.info("Fetching product by ID: {}", id);
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
            
        return new ModelMapper().map(product, ProductDto.class);
    }
    
    @Override
    public ProductDto updateProduct(Long id, ProductDto productDetails) {
        logger.info("Updating product with ID: {}", id);

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        product.setTitle(productDetails.getTitle());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setStoreId(productDetails.getStoreId());
        product.setStock(productDetails.getStock());
        productRepository.save(product);

        return modelMapper.map(product, ProductDto.class);
    }

    @Override
    public void deleteProduct(Long id) {
        logger.info("Deleting product with ID: {}", id);
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        productRepository.delete(product);
    }

    public void updateStock(Long id, int quantity) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        product.setStock(product.getStock() - quantity);
        productRepository.save(product);
    }

    public boolean isProductOwner(Long productId, Jwt jwt) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) {
            return false;
        }
        return product.getCreatedBy().equals(jwt.getClaim("preferred_username"));
    }

    @PostAuthorize("hasRole('admin') or returnObject.createdBy == #createdBy")
    @Override
    public ProductDto getProductById(Long id, String createdBy) {
        logger.info("Fetching product by ID {}  only created by {}", id, createdBy);
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return new ModelMapper().map(product, ProductDto.class);
    }
}
