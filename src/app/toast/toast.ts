import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.css']
})
export class ToastComponent implements OnInit {
  message: string | null = null;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toastMessage$.subscribe((message: string) => {
      this.message = message;
      setTimeout(() => this.message = null, 3000);
    });
  }
}
