package com.example.msventas.controller;

import com.example.msventas.entity.Venta;
import com.example.msventas.service.VentaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
public class VentaController {

    private final VentaService ventaService;

    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    @PostMapping
    public Venta registrarVenta(@RequestBody Venta venta) {
        return ventaService.registrarVenta(venta);
    }

    @GetMapping
    public List<Venta> listarVentas() {
        return ventaService.listarVentas();
    }

    @PutMapping("/{id}")
    public Venta actualizarVenta(@PathVariable Long id, @RequestBody Venta venta) {
        return ventaService.actualizarVenta(id, venta);
    }

    @DeleteMapping("/{id}")
    public void eliminarVenta(@PathVariable Long id) {
        ventaService.eliminarVenta(id);
    }
}
