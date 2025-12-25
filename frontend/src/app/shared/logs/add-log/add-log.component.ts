import { Component, OnDestroy, ElementRef, ViewChild, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LogService } from '../../../services/log.service';
import { DeviceService } from '../../../services/device.service';
import { MaintenanceLogPayload, LogStatus } from '../../../models/maintenance-log.model';
import { Device } from '../../../models/device.model';

type ImageMode = 'upload' | 'camera';

@Component({
  selector: 'app-add-log',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-log.component.html',
  styleUrls: ['./add-log.component.css']
})
export class AddLogComponent implements OnInit, OnDestroy {
  @ViewChild('videoRef') videoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasRef') canvasRef?: ElementRef<HTMLCanvasElement>;

  private route = inject(ActivatedRoute);
  private deviceApi = inject(DeviceService);

  // Form fields aligned to backend
  form = {
    machineName: '',
    deviceId: null as number | null,   // will become { device: { id } }
    facultyId: null as number | null,  // optional mapping
    hodId: null as number | null,      // optional mapping
    studentId: null as number | null,  // optional mapping
    maintenanceDate: this.todayISO(),  // "YYYY-MM-DD"
    issueDescription: '',
    actionTaken: '',
    status: 'PENDING' as LogStatus,
    remarks: '',
    imageDataUrl: ''                   // preview only; will be stripped to raw base64
  };

  statuses: LogStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
  message = '';
  loading = false;

  imageMode: ImageMode = 'upload';
  private mediaStream: MediaStream | null = null;

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    // Read ?deviceId= from QR flow or links
    const qp = this.route.snapshot.queryParamMap;
    const deviceIdParam = qp.get('deviceId');
    const deviceId = deviceIdParam ? Number(deviceIdParam) : NaN;

    if (!Number.isNaN(deviceId) && deviceId > 0) {
      this.form.deviceId = deviceId;

      // Optional: fetch the device to prefill machineName if empty
      this.deviceApi.getById(deviceId).subscribe({
        next: (dev: Device) => {
          if (dev?.deviceName && !this.form.machineName) {
            this.form.machineName = dev.deviceName;
          }
        },
        error: () => {
          // ignore – not fatal for submitting the log
        }
      });
    }
  }

  private todayISO() {
    const d = new Date();
    const off = d.getTimezoneOffset();
    const local = new Date(d.getTime() - off * 60000);
    return local.toISOString().slice(0, 10);
  }

  // ------- Upload flow -------
  async onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const MAX = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX) {
      alert('Please select an image under 2MB.');
      input.value = '';
      return;
    }

    const arrayBuf = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuf)));
    // Data URL for preview (we'll strip it before sending)
    this.form.imageDataUrl = `data:${file.type};base64,${base64}`;
  }

  // ------- Camera flow -------
  private async startCamera() {
    const videoEl = this.videoRef?.nativeElement;
    if (!videoEl) return;

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      videoEl.srcObject = this.mediaStream;
      await videoEl.play();
    } catch (e) {
      console.error(e);
      alert('Could not access camera. Please grant permission or use upload.');
    }
  }

  private stopCamera() {
    const videoEl = this.videoRef?.nativeElement;
    videoEl?.pause();
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(t => t.stop());
      this.mediaStream = null;
    }
  }

  captureFrame() {
    const videoEl = this.videoRef?.nativeElement;
    const canvasEl = this.canvasRef?.nativeElement;
    if (!videoEl || !canvasEl) return;

    if (!videoEl.videoWidth || !videoEl.videoHeight) {
      alert('Camera not ready yet. Try again.');
      return;
    }
    canvasEl.width = videoEl.videoWidth;
    canvasEl.height = videoEl.videoHeight;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
    this.form.imageDataUrl = canvasEl.toDataURL('image/jpeg', 0.85); // preview
  }

  clearImage() {
    this.form.imageDataUrl = '';
    this.stopCamera();
  }

  onModeChange(mode: ImageMode) {
    this.imageMode = mode;
    this.form.imageDataUrl = '';

    if (mode === 'camera') {
      setTimeout(() => this.startCamera());
    } else {
      this.stopCamera();
    }
  }

  private toRawBase64(dataUrl: string): string | undefined {
    if (!dataUrl) return undefined;
    const idx = dataUrl.indexOf('base64,');
    if (idx === -1) return undefined;
    return dataUrl.substring(idx + 'base64,'.length);
  }

  submitLog() {
    if (!this.form.machineName || !this.form.deviceId || !this.form.maintenanceDate || !this.form.issueDescription) {
      alert('Please fill required fields: Machine Name, Device ID, Date, Issue Description.');
      return;
    }

    const payload: MaintenanceLogPayload = {
      machineName: this.form.machineName,
      device: { id: this.form.deviceId },
      maintenanceDate: this.form.maintenanceDate, // "YYYY-MM-DD"
      issueDescription: this.form.issueDescription,
      actionTaken: this.form.actionTaken || '',
      status: this.form.status,
      remarks: this.form.remarks || '',
      imageBase64: this.toRawBase64(this.form.imageDataUrl)
    };

    // Optional relations
    if (this.form.facultyId) payload.faculty = { id: this.form.facultyId };
    if (this.form.hodId) payload.hod = { id: this.form.hodId };
    if (this.form.studentId) payload.student = { id: this.form.studentId };

    this.loading = true;
    this.logService.create(payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = 'Maintenance log submitted successfully.';
        // Reset but keep today’s date
        const keepDate = this.todayISO();
        this.form = {
          machineName: '',
          deviceId: null,
          facultyId: null,
          hodId: null,
          studentId: null,
          maintenanceDate: keepDate,
          issueDescription: '',
          actionTaken: '',
          status: 'PENDING',
          remarks: '',
          imageDataUrl: ''
        };
        this.stopCamera();
        console.log('Saved log:', res);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('Failed to submit maintenance log.');
      }
    });
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }
}
