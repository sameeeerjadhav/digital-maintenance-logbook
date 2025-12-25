package com.college.maintenance_backend.service;

import com.college.maintenance_backend.model.Device;
import com.college.maintenance_backend.repository.DeviceRepository;
import com.college.maintenance_backend.utils.QRCodeGenerator;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class DeviceServiceImpl implements DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Override
    public Device addDevice(Device device) {
        // ✅ Save first to get ID
        Device savedDevice = deviceRepository.save(device);

        try {
            // ✅ Use external folder (not classpath)
            String qrFolder = "uploads/qr_codes/"; // <-- folder exists in your root (as per your screenshot)
            Files.createDirectories(Paths.get(qrFolder));

            String fileName = "device_" + savedDevice.getId() + ".png";
            String qrPath = qrFolder + fileName;

            String qrContent = "Device ID: " + savedDevice.getId() +
                    "\nDevice Name: " + savedDevice.getDeviceName() +
                    "\nType: " + savedDevice.getDeviceType() +
                    "\nSerial No: " + savedDevice.getSerialNumber() +
                    "\nLab: " + savedDevice.getLabName() +
                    "\nStatus: " + savedDevice.getStatus();

            QRCodeGenerator.generateQRCode(qrContent, qrPath);

            // ✅ Relative path for frontend
            savedDevice.setQrCodePath("/qr_codes/" + fileName);

            savedDevice = deviceRepository.save(savedDevice);

        } catch (WriterException | IOException e) {
            e.printStackTrace();
        }

        return savedDevice;
    }

    @Override
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    @Override
    public Optional<Device> getDeviceById(Long id) {
        return deviceRepository.findById(id);
    }

    @Override
    public Device updateDevice(Long id, Device updatedDevice) {
        return deviceRepository.findById(id).map(device -> {
            device.setDeviceName(updatedDevice.getDeviceName());
            device.setDeviceType(updatedDevice.getDeviceType());
            device.setSerialNumber(updatedDevice.getSerialNumber());
            device.setLabName(updatedDevice.getLabName());
            device.setStatus(updatedDevice.getStatus());
            return deviceRepository.save(device);
        }).orElse(null);
    }

    @Override
    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }
}