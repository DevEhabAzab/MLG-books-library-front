import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { error } from 'console';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  createBookForm: FormGroup;

  /**
   *
   */
  constructor(private fb: FormBuilder, private router: Router, private bookservice:BookService) {
    this.createBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      publishedYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });
  }
  ngOnInit(): void {
    
  }
  onCreate() {
    
    if (this.createBookForm.valid) {
      const newBook = this.createBookForm.value;
      // TODO: Save the book (e.g., via API call)
      this.bookservice.createBook(newBook).subscribe(d=>{
        this.router.navigate(['']); 
      },error=>{
        console.log("err",error)
      });
    }
  }

  onCancel() {
    this.router.navigate(['']); // Navigate back to the book list
  }
}
