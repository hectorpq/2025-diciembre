package com.example.msventas.service;

import com.example.msventas.entity.Venta;
import com.example.msventas.repository.VentaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VentaService {

    private final VentaRepository ventaRepository;

    public VentaService(VentaRepository ventaRepository) {
        this.ventaRepository = ventaRepository;
    }

    public Venta registrarVenta(Venta venta) {
        return ventaRepository.save(venta);
    }

    public List<Venta> listarVentas() {
        return ventaRepository.findAll();
    }

    public void eliminarVenta(Long id) {
        ventaRepository.deleteById(id);
    }

    public Venta actualizarVenta(Long id, Venta ventaActualizada) {
        return ventaRepository.findById(id)
                .map(v -> {
                    v.setProducto(ventaActualizada.getProducto());
                    v.setModelo(ventaActualizada.getModelo());
                    v.setTalla(ventaActualizada.getTalla());
                    v.setCantidad(ventaActualizada.getCantidad());
                    v.setPrecioUnitario(ventaActualizada.getPrecioUnitario());
                    v.setTotal(ventaActualizada.getCantidad() * ventaActualizada.getPrecioUnitario());
                    return ventaRepository.save(v);
                })
                .orElseThrow(() -> new RuntimeException("Venta no encontrada"));
    }
}
