import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Book } from '../book.interface';
import { BookService } from '../book.service';
import { error } from 'console';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  editBookForm!: FormGroup;
  bookId!: number;
  
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService:BookService
  ) {
    this.editBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      publishedYear: [2010, [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });

  }

  ngOnInit(): void {
    // Get the book ID from route params
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.bookId)
    this.loadBookData();
  }

  // Load book data based on bookId (from API or service)
  loadBookData(): void {
    // Assuming you have a service to fetch book data by ID
    
    this.bookService.getBookById(this.bookId).subscribe(book=>{
      console.log(book)
      this.editBookForm = this.fb.group({
        title: [book.title, Validators.required],
        author: [book.author, Validators.required],
        genre: [book.genre, Validators.required],
        publishedYear: [book.publishedYear, [Validators.required, Validators.pattern('^[0-9]{4}$')]]
      });
    })

    
  }

  onSave(): void {
    if (this.editBookForm.valid) {
      console.log("updated book");
      const updatedBook = this.editBookForm.value;
      // Call the service to save the updated book
      console.log("updated book",updatedBook);
      this.bookService.updateBook(this.bookId,updatedBook).subscribe(d=>{
        this.router.navigate(['']);

      },error=>{

      });

      // Redirect to book list after update
    }
    else{
      console.error(this.editBookForm.errors)
    }
  }

  onCancel(): void {
    this.router.navigate(['']);
  }
}