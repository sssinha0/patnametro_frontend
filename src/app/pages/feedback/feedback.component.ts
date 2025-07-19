import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-feedback',
  imports: [MatFormFieldModule,MatCardModule,CommonModule,FormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  feedback = {
    name: '',
    email: '',
    message: ''
  };

  submitFeedback() {
    console.log('Feedback submitted:', this.feedback);
    // Later: send to backend
    alert('Thank you for your feedback!');
    this.feedback = { name: '', email: '', message: '' };
  }
}
