import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileItem } from '@core/models/file-item';
import Swal from 'sweetalert2';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];
  images: FileItem[] = [];
  imageURL = '../../../assets/noimage.png';
  file: any;
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productsSvc: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsSvc.getProducts().subscribe((products: Product[]) => {
      debugger;
      this.products = products;
    });
  }

  selectChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(this.file[0]);
      reader.onloadend = (event: ProgressEvent<FileReader>) => {
        this.imageURL = reader.result as string;
        this.images.push(new FileItem(this.file[0]));
      };
    }
  }

  productRegister() {
    this.productsSvc.uploadProductFirebase(this.images, this.form.value);
  }
  onDelete(product: Product) {
    Swal.fire({
      icon: 'question',
      title: `Desea eliminar el producto ${product.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsSvc.deleteProduct(product);
      }
    });
  }
  clearForm() {
    this.form.reset();
    this.imageURL = '../../../assets/noimage.png';
  }
}
