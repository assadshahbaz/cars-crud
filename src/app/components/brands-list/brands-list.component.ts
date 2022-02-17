import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasicService } from 'src/app/utils/basic.service';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent implements OnInit {

  brands;
  brandDetails;

  brandsForm: FormGroup;
  add_new_row = false;
  isEdit = null;

  base64textString = '';

  constructor(
    private toasterService: ToastrService,
    private fb: FormBuilder,
    private basicService: BasicService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.brandsList();
  }

  initForm() {
    this.brandsForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      description: this.fb.control(''),
      logo: this.fb.control(''),
    })
  }

  brandsList() {
    this.basicService.fetchAll('brand')
      .subscribe((resp: any) => {
        this.brands = resp.data;
      });
  }

  edit(brand, index) {
    this.cancel();
    this.isEdit = { ...brand, index };

    this.brandsForm.setValue({
      name: brand.name,
      description: brand.description,
      logo: brand.logo
    });
  }

  update() {
    if (this.brandsForm.valid) {
      this.basicService.create('brand/update', { ...this.brandsForm.value, brandId: this.isEdit._id })
        .subscribe(() => {
          this.brandsList();
          this.toasterService.success('Brand updated!');

          this.cancelEdit();
          this.cancel();
        });
    } else {
      this.toasterService.error('Fill required fileds!');
    }
  }

  save() {
    if (this.brandsForm.valid) {
      this.basicService.create('brand', this.brandsForm.value)
        .subscribe(() => {
          this.brandsList();
          this.toasterService.success('Brand Added');

          this.cancelEdit();
          this.cancel();
        });
    } else {
      this.toasterService.error('Fill required fileds!');
    }
  }

  delete(id: string) {
    if (confirm('Are you sure?') == true) {
      this.basicService.create('brand/delete', { brandId: id })
        .subscribe(() => {
          this.brandsList();
          this.toasterService.success('Deleted!');
        });
    }
  }

  cancelEdit() {
    this.isEdit = null;
    this.brandsForm.reset();
  }

  cancel() {
    this.brandsForm.reset();
    this.add_new_row = false;
  }

  onFileSelected(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.base64textString = `data:image/png;base64,${btoa(e.target.result)}`;
    this.brandsForm.get('logo').setValue(this.base64textString);
  }

}
