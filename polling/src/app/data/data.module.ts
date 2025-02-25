import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChoferRepository } from "../domain/repositories/chofer.repository";
import { saveChoferUseCase } from '../domain/usecases/saveChofer.usecase';
import { GetAllChoferesUseCase } from '../domain/usecases/getAllChoferes.usecase';
import { updateChoferUseCase } from '../domain/usecases/updateChofer.usecase';
import { deleteChoferUseCase } from '../domain/usecases/deleteChofer.usecase';
import { ChoferImplementationRepository } from './repositories/mappers/chofer-implementation.repository';

const saveChoferUseCaseFactory = (cRepo: ChoferRepository) => new saveChoferUseCase(cRepo);
export const saveChoferUseCaseProvider = {
    provide: saveChoferUseCase,
    useFactory: saveChoferUseCaseFactory,
    deps: [ChoferRepository],
};

const GetAllChoferesUseCaseFactory = (cRepo: ChoferRepository) => new GetAllChoferesUseCase(cRepo);
export const GetAllChoferesUseCaseProvider = {
    provide: GetAllChoferesUseCase,
    useFactory: GetAllChoferesUseCaseFactory,
    deps: [ChoferRepository],
};

const UpdateChoferUseCaseFactory = (cRepo: ChoferRepository) => new updateChoferUseCase(cRepo);
export const UpdateChoferUseCaseProvider = {
    provide: updateChoferUseCase,
    useFactory: UpdateChoferUseCaseFactory,
    deps: [ChoferRepository],
};

const DeleteChoferUseCaseFactory = (cRepo: ChoferRepository) => new deleteChoferUseCase(cRepo);
export const DeleteChoferUseCaseProvider = {
    provide: deleteChoferUseCase,
    useFactory: DeleteChoferUseCaseFactory,
    deps: [ChoferRepository]
};

@NgModule({
    providers: [
        saveChoferUseCaseProvider,
        GetAllChoferesUseCaseProvider,
        UpdateChoferUseCaseProvider,
        DeleteChoferUseCaseProvider,
        { provide: ChoferRepository, useClass: ChoferImplementationRepository}
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
})

export class DataModule { }

