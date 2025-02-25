import { Observable } from "rxjs";
import { ChoferModel } from "../models/chofer.model";


export abstract class ChoferRepository {
    abstract save(params: ChoferModel): Observable<ChoferModel>;  // 🔹 No enviamos `id`

    abstract getAll(): Observable<ChoferModel[]>;

    abstract update(id: number, params: ChoferModel): Observable<ChoferModel>;

    abstract delete(id: number): Observable<ChoferModel>;
}