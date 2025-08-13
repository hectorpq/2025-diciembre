package com.example.mscaja.service;

import com.example.mscaja.entity.MovimientoCaja;
import com.example.mscaja.repository.MovimientoCajaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MovimientoCajaService {

    private final MovimientoCajaRepository repository;

    public MovimientoCajaService(MovimientoCajaRepository repository) {
        this.repository = repository;
    }

    public MovimientoCaja registrarMovimiento(MovimientoCaja movimiento) {
        return repository.save(movimiento);
    }

    public List<MovimientoCaja> listarMovimientos() {
        return repository.findAll();
    }

    public List<MovimientoCaja> movimientosPorRango(LocalDateTime inicio, LocalDateTime fin) {
        return repository.findByFechaBetween(inicio, fin);
    }

    public void eliminarMovimiento(Long id) {
        repository.deleteById(id);
    }
}
