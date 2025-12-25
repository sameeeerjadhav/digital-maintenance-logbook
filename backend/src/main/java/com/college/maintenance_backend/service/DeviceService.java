package com.college.maintenance_backend.service;

import com.college.maintenance_backend.model.Device;
import java.util.List;
import java.util.Optional;

public interface DeviceService {
    Device addDevice(Device device);
    List<Device> getAllDevices();
    Optional<Device> getDeviceById(Long id);
    Device updateDevice(Long id, Device device);
    void deleteDevice(Long id);
}