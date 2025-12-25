import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HodService, Hod } from '../../services/hod.service';
import { Router, RouterModule } from '@angular/router';

@Component({
selector: 'app-view-hods',
standalone: true,
imports: [CommonModule, RouterModule],
templateUrl: './view-hods.component.html',
styleUrls: ['./view-hods.component.css']
})
export class ViewHodsComponent implements OnInit {
hodList: Hod[] = [];
loading = false;
errorMessage = '';

constructor(private hodService: HodService, private router: Router) {}

ngOnInit() {
this.loadHods();
}

loadHods() {
this.loading = true;
this.errorMessage = '';
this.hodService.getAll().subscribe({
next: (data) => {
this.hodList = data;
this.loading = false;
},
error: (err) => {
this.errorMessage = 'Failed to load HOD data.';
this.loading = false;
console.error(err);
}
});
}

deleteHod(id: number | undefined) {
if (!id) return;
const confirmDelete = confirm('Are you sure you want to delete this HOD?');
if (!confirmDelete) return;

this.hodService.delete(id).subscribe({
next: () => {
this.hodList = this.hodList.filter((hod) => hod.id !== id);
},
error: (err) => {
console.error(err);
alert('Failed to delete HOD.');
}
});
}

editHod(id: number | undefined) {
if (id) {
this.router.navigate([`/admin-dashboard/edit-hod/${id}`]);
}
}
}