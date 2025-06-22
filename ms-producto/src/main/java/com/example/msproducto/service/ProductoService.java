package com.example.msproducto.service;

import com.example.msproducto.entity.Producto;

import java.util.List;

public interface ProductoService {
    Producto crearProducto(Producto producto);
    List<Producto> listarProductos();
}
