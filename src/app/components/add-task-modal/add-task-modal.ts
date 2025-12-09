import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-task-modal',
    imports: [ReactiveFormsModule],
    templateUrl: './add-task-modal.html',
    styleUrl: './add-task-modal.scss',
})
export class AddTaskModal {
    @Output() closeModal = new EventEmitter<void>();
    @Output() taskCreated = new EventEmitter<{ name: string; description: string; status: string }>();

    taskForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.taskForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            status: ['PENDENTE', Validators.required]
        });
    }

    onSubmit() {
        if (this.taskForm.valid) {
            this.taskCreated.emit(this.taskForm.value);
            this.taskForm.reset({ status: 'PENDENTE' });
        }
    }

    onClose() {
        this.closeModal.emit();
    }

    onOverlayClick(event: MouseEvent) {
        if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
            this.onClose();
        }
    }
}
