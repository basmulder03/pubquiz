import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '@prisma/client';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  getAllRoles() {
    return this.http.get<Role[]>('roles');
  }
}
