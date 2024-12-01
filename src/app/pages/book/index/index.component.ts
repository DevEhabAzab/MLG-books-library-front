import { AfterViewInit, Component, OnInit, booleanAttribute } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit,AfterViewInit {
   books:Book[]= [];
   displayedColumns: string[] = ['id', 'author', 'title', 'genre', 'publishedYear','actions'];
   dataSource = new MatTableDataSource<Book>([]); // Initialize empty data source

  /**
   *
   */
  constructor(private bookService:BookService,private router :Router) {
    
    this.bookService.getAll().subscribe(data=>{
      console.log(data)
      this.books=data;
    })
  }
ngOnInit(): void {
  this.bookService.getAll().subscribe(data=>{
    console.log(data)
    this.books=data;
    this.dataSource.data = this.books;
    console.log("books",this.books)
   
  })
}
ngAfterViewInit() {
  console.log('Table data:', this.books);
}
onUpdate(book: Book): void {
  // Handle the update action
  console.log('Updating book:', book);
  this.router.navigate(['edit/'+book.id])
}

onDelete(id: number): void {
  // Handle the delete action
  const confirmed = confirm('Are you sure you want to delete this book?');
  if (confirmed) {
    this.bookService.deleteBook(id).subscribe(
      (response) => {
        console.log('Book deleted successfully', response);
        this.books = this.books.filter(book => book.id !== id);  // Remove deleted book from the list
        this.dataSource.data=this.books;
      },
      (error) => {
        console.error('Error deleting book', error);
        alert('There was an error while deleting the book.');
      }
    );
  }
}
}
