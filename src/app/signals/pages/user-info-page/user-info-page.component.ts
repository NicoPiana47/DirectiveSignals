import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {

  private usersService = inject(UsersServiceService)
  public userId = signal(1);

  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal(true);

  public fullName = computed<string>(() => {
    if(!this.currentUser()) return 'Usuario no encontrado';

    const user = this.currentUser();
    return `${user!.first_name} ${user!.last_name}`;
  });

  ngOnInit(): void {
    this.loadUser( this.userId());
  }

  loadUser(id: number): void {
    if(id <= 0) return;
    this.userId.set(id);
    this.currentUser.set(undefined);

    this.usersService.getUsersById(id)
    .subscribe({
      next: (value) => {
        this.currentUser.set(value);
        this.userWasFound.set(true);
      },
      error: () => {
        this.currentUser.set(undefined);
        this.userWasFound.set(false);
      },
    });
  }
}
