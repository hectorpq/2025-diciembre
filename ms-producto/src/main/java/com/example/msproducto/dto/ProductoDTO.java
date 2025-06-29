package com.example.msproducto.dto;

import com.example.msproducto.entity.DetalleMaterial;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductoDTO {
    private Long idProducto;
    private String nombreProducto;
    private Integer cantidadProducida;
    private Integer cantidadActual; // 👈 Nuevo campo agregado
    private DisenioDTO disenio; // Diseño completo
    private List<DetalleMaterial> materialesConsumidos;
}
