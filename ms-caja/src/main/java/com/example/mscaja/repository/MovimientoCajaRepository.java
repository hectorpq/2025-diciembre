package com.example.mscaja.repository;

import com.example.mscaja.entity.MovimientoCaja;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface MovimientoCajaRepository extends JpaRepository<MovimientoCaja, Long> {
    List<MovimientoCaja> findByFechaBetween(LocalDateTime inicio, LocalDateTime fin);
}
