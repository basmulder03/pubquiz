import { Component } from '@angular/core';
import { Role } from '@prisma/client';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  roles: Role[] = [];

  constructor(private roleService: RolesService) {
    const uns = roleService.getAllRoles().subscribe((roles) => {
      this.roles = roles;
      uns.unsubscribe();
    });
  }
}
