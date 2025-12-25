package com.college.maintenance_backend.controller;

import com.college.maintenance_backend.model.Device;
import com.college.maintenance_backend.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/devices")
@CrossOrigin(origins = "http://localhost:4200")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    // ✅ Add device (any authenticated role)
    @PostMapping("/add")
    public ResponseEntity<Device> addDevice(@RequestBody Device device) {
        Device saved = deviceService.addDevice(device);
        return ResponseEntity.ok(saved);
    }

    // ✅ Get all devices
    @GetMapping("/all")
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }

    // ✅ Get device by ID
    @GetMapping("/{id}")
    public Optional<Device> getDeviceById(@PathVariable Long id) {
        return deviceService.getDeviceById(id);
    }

    // ✅ Update device
    @PutMapping("/update/{id}")
    public Device updateDevice(@PathVariable Long id, @RequestBody Device device) {
        return deviceService.updateDevice(id, device);
    }

    // ✅ Delete device
    @DeleteMapping("/delete/{id}")
    public void deleteDevice(@PathVariable Long id) {
        deviceService.deleteDevice(id);
    }
}