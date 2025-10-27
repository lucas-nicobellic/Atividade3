import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserva',
  standalone: false,
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent implements OnInit {
 
  reservaForm!: FormGroup;

  destinos = ['Paris', 'Nova York', 'Tóquio', 'Rio de Janeiro'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reservaForm = this.fb.group({
      destino: ['', Validators.required],
      dataIda: ['', Validators.required],
      dataVolta: ['', Validators.required],
      passageiros: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      email: ['', [Validators.required, Validators.email]]
    });

   
    const dadosSalvos = localStorage.getItem('reservaForm');
    if (dadosSalvos) {
      this.reservaForm.patchValue(JSON.parse(dadosSalvos));
    }

    
    this.reservaForm.valueChanges.subscribe(valor => {
      localStorage.setItem('reservaForm', JSON.stringify(valor));
    });
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      console.log(this.reservaForm.value);
      alert('Reserva enviada com sucesso!');
      localStorage.removeItem('reservaForm');
      this.reservaForm.reset();
    }
  }

  
  dataInvalida(): boolean {
    const ida = new Date(this.reservaForm.get('dataIda')?.value);
    const volta = new Date(this.reservaForm.get('dataVolta')?.value);
    return volta < ida;
  }
}

