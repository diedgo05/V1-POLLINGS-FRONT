import { Injectable } from "@angular/core";
import { ChoferRepository } from "../../../domain/repositories/chofer.repository";
import { ChoferImplementationRepositoryMapper } from "./chofer-repository.mapper";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ChoferModel } from "../../../domain/models/chofer.model";
import { ChoferEntity } from "../entities/chofer.entity";

@Injectable({
    providedIn: 'root'
})

export class ChoferImplementationRepository extends ChoferRepository {
    choferMapper = new ChoferImplementationRepositoryMapper();
    constructor(private http: HttpClient) {
        super();
    }

     save(params: ChoferModel): Observable<ChoferModel> {
        return this.http.post<ChoferEntity>('http://localhost:8080/choferes/', params).pipe(map(this.choferMapper.mapFrom));
    }

    getAll(): Observable<ChoferModel[]> {
        return this.http
          .get<{ choferes: any[] }>('http://localhost:8080/choferes/') 
          .pipe(map((response) => {
            return response.choferes.map((chofer) => ({
                id: chofer.ID, 
                nombre: chofer.Nombre, 
                apellido_p: chofer.Apellido_p, 
                apellido_m: chofer.Apellido_m, 
                edad: chofer.Edad, 
            }));
        }));
    }
      
     update(id: number, params: ChoferModel): Observable<ChoferModel> {
        return this.http.put<ChoferEntity>(`http://localhost:8080/choferes/${id}`, params).pipe(map(this.choferMapper.mapFrom))
    }

     delete(id: number): Observable<ChoferModel> {
        return this.http.delete<ChoferEntity>(`http://localhost:8080/choferes/${id}`);
    }
}