import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { error } from 'console';
import { ReturnDocument } from 'mongodb';
import { Observable, catchError, throwError } from 'rxjs';
import { Book } from './book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { 


  }
  BaseUrl:string="https://localhost:7164/api/book";
  getAll():Observable<Book[]> {
     var data = this.http.get<Book[]>(this.BaseUrl).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );;
    return data;
  }

  // Create a new book
  createBook(book: Book): Observable<Book> {
    console.log(book)
    return this.http.post<Book>(this.BaseUrl, book);
  }

  // Get all books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.BaseUrl);
  }

  // Get a single book by ID
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.BaseUrl}/${id}`);
  }

  // Update an existing book
  updateBook( bookId:number,book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.BaseUrl}/${bookId}`, book);
  }

  // Delete a book by ID
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.BaseUrl}/${id}`, { responseType: 'text' });
  }

}
