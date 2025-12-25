import { Component, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Html5QrcodeScanner, Html5QrcodeResult } from 'html5-qrcode';
import { Router } from '@angular/router';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../models/device.model';

@Component({
  selector: 'app-qr-scan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.css']
})
export class QrScanComponent implements AfterViewInit, OnDestroy {
  private scanner?: Html5QrcodeScanner;
  private router = inject(Router);
  private devices = inject(DeviceService);

  decodedText: string | null = null;
  errorText: string | null = null;

  resolving = false;
  matchedDevice: Device | null = null;

  ngAfterViewInit(): void {
    this.scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: { width: 280, height: 280 },
        aspectRatio: 1.0,
        rememberLastUsedCamera: true
      },
      false
    );

    const onScanSuccess = (decodedText: string, _decodedResult: Html5QrcodeResult) => {
      this.decodedText = decodedText;
      this.errorText = null;

      // stop camera UI after a successful scan
      this.scanner?.clear().catch(() => {});
      this.resolveDevice(decodedText);
    };

    const onScanError = (errorMessage: string) => {
      this.errorText = errorMessage || null;
    };

    this.scanner.render(onScanSuccess, onScanError);
  }

  private resolveDevice(payload: string) {
    this.resolving = true;
    this.matchedDevice = null;

    this.devices.findFromQrPayload(payload).subscribe({
      next: (dev) => {
        this.matchedDevice = dev ?? null;
        this.resolving = false;
        if (!dev) this.errorText = 'No device matched this QR code.';
      },
      error: (err) => {
        console.error(err);
        this.resolving = false;
        this.errorText = 'Error resolving device from QR.';
      }
    });
  }

  restart(): void {
    if (!this.scanner) return;
    this.decodedText = null;
    this.errorText = null;
    this.matchedDevice = null;
    this.resolving = false;

    this.scanner.render(
      (t) => {
        this.decodedText = t;
        this.scanner?.clear().catch(() => {});
        this.resolveDevice(t);
      },
      (_e) => {}
    );
  }

  goToViewDevice() {
    if (!this.matchedDevice?.id) return;
    // Adjust path to your view page if needed
    this.router.navigate(['/hod-dashboard/view-device'], { queryParams: { id: this.matchedDevice.id } });
  }

  goToAddLog() {
    if (!this.matchedDevice?.id) return;
    this.router.navigate(['/hod-dashboard/add-log'], { queryParams: { deviceId: this.matchedDevice.id } });
  }

  ngOnDestroy(): void {
    this.scanner?.clear().catch(() => {});
  }
}
