import { Component } from '@angular/core';

@Component({
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {

  onFieldUpdate(field: string, value: string){
    console.log(`Field ${field} updated with value ${value}`);
  }

}
