import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent implements OnDestroy, OnInit{

  public counter = signal(10);

  public user = signal<User>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  });

  public fullName = computed(() => `${this.user().first_name} ${this.user().last_name}`);
  public userChangedEffect = effect(() => {
    console.log(`${this.user().first_name} ${this.user().last_name} - ${this.counter() }`);
  });

  ngOnDestroy(): void {
    //this.userChangedEffect.destroy();
  }

  ngOnInit(): void {
    setInterval(() => {
      this.counter.update( current => current + 1);

      // if(this.counter() === 15)
      //   this.userChangedEffect.destroy();
    }, 1000);
  }

  onFieldUpdate(field: keyof User, value: string){
    this.user.update( current => {
      switch (field) {
        case 'email':
          current.email = value
          break;
        case 'first_name':
          current.first_name = value
          break;
        case 'last_name':
          current.last_name = value
          break;
      }

      return current;
    });
  }

  increaseBy( value: number){
    this.counter.update( current => current + value);
  }

}
