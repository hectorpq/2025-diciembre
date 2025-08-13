package com.example.mscaja.controller;

import com.example.mscaja.entity.MovimientoCaja;
import com.example.mscaja.service.MovimientoCajaService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/caja")
public class MovimientoCajaController {

    private final MovimientoCajaService service;

    public MovimientoCajaController(MovimientoCajaService service) {
        this.service = service;
    }

    @PostMapping
    public MovimientoCaja registrar(@RequestBody MovimientoCaja movimiento) {
        return service.registrarMovimiento(movimiento);
    }

    @GetMapping
    public List<MovimientoCaja> listar() {
        return service.listarMovimientos();
    }

    @GetMapping("/rango")
    public List<MovimientoCaja> porRango(@RequestParam String inicio, @RequestParam String fin) {
        LocalDateTime fechaInicio = LocalDateTime.parse(inicio);
        LocalDateTime fechaFin = LocalDateTime.parse(fin);
        return service.movimientosPorRango(fechaInicio, fechaFin);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminarMovimiento(id);
    }
}
