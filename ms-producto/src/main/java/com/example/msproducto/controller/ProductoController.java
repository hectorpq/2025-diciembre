package com.example.msproducto.controller;

import com.example.msproducto.dto.ProductoDTO;
import com.example.msproducto.entity.Producto;
import com.example.msproducto.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto) {
        return productoService.crearProducto(producto);
    }

    @GetMapping
    public List<ProductoDTO> listarProductos() {
        return productoService.listarProductos();
    }

    @PutMapping("/{id}/stock")
    public void descontarStock(@PathVariable Long id, @RequestParam int cantidad) {
        productoService.descontarStock(id, cantidad);
    }

}
