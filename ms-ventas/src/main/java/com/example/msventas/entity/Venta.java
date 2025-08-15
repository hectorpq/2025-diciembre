package com.example.msventas.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "ventas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String producto; // Ej: Buzo Nike Talla M
    private String modelo;   // Ej: Nike, Puma
    private String talla;    // Ej: M, L, XL

    private int cantidad;
    private double precioUnitario;
    private double total;

    private LocalDateTime fechaVenta;

    @PrePersist
    public void prePersist() {
        fechaVenta = LocalDateTime.now();
        total = cantidad * precioUnitario;
    }
}
