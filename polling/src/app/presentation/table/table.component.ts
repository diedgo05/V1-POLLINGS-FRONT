import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChoferModel } from '../../domain/models/chofer.model';
import { GetAllChoferesUseCase } from '../../domain/usecases/getAllChoferes.usecase';
import { saveChoferUseCase } from '../../domain/usecases/saveChofer.usecase';
import { updateChoferUseCase } from '../../domain/usecases/updateChofer.usecase';
import { deleteChoferUseCase } from '../../domain/usecases/deleteChofer.usecase';


@Component({
  selector: 'app-chofer-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  choferes: ChoferModel[] = [];
  isModalOpen = false;
  modalMode: 'add' | 'update' = 'add';
  selectedChofer: ChoferModel | null = null;
  choferForm: FormGroup;

  constructor(
    private getAllChoferesUseCase: GetAllChoferesUseCase,
    private saveChoferUseCase: saveChoferUseCase,
    private updateChoferUseCase: updateChoferUseCase,
    private deleteChoferUseCase: deleteChoferUseCase,
    private fb: FormBuilder
  ) {
    this.choferForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido_p: ['', Validators.required],
      apellido_m: ['', Validators.required],
      edad: [18, [Validators.required, Validators.min(18)]], // Asegurar que sea >= 18
    });
  }

  ngOnInit(): void {
    this.loadChoferes();
  }

  loadChoferes(): void {
    this.getAllChoferesUseCase.execute().subscribe((choferes: ChoferModel[]) => {
      this.choferes = choferes;
    });
  }

  openModal(mode: 'add' | 'update', chofer?: ChoferModel): void {
    this.modalMode = mode;
    this.isModalOpen = true;

    if (mode === 'update' && chofer) {
      this.selectedChofer = chofer;
      this.choferForm.patchValue(chofer);
    } else {
      this.selectedChofer = null;
      this.choferForm.reset({ nombre: '', apellido_p: '', apellido_m: '', edad: 18 });
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.choferForm.reset();
  }

  onSubmit(): void {
    const choferData = this.choferForm.value;

    if (this.modalMode === 'add') {
      this.saveChoferUseCase.execute(choferData).subscribe(() => {
        console.log("Se agrego un chofer")
        this.closeModal();
        this.loadChoferes();
      });
    } else if (this.modalMode === 'update' && this.selectedChofer) {
      const choferActualizado = { ...this.selectedChofer, ...choferData }; 
      this.updateChoferUseCase.execute(this.selectedChofer!.id, choferActualizado).subscribe(() => {
        console.log("Se edito un chofer")
        this.closeModal();
        this.loadChoferes();
      });
    }
  } 

  onDeleteChofer(id: number): void {
    this.deleteChoferUseCase.execute({ id }).subscribe(() => {
      this.loadChoferes();
    });
  }
}
