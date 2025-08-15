import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'not-found',
  imports: [],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {

  ubiValue = input<string>('')

  location = inject(Location)

  backLocation() {
    this.location.back()
  }

}
