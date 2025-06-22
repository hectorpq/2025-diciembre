package com.example.msproducto.client;

import com.example.msproducto.dto.DisenioDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-diseno", url = "http://localhost:8081")
public interface DisenioClient {

    @GetMapping("/api/disenios/{id}")
    DisenioDTO obtenerDisenioPorId(@PathVariable Long id);
}
