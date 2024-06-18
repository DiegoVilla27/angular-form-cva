import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {
  ErrorMsgComponent,
  IErrorMsg
} from "../../components/error-msg/error-msg.component";
import { InputComponent } from "../../components/input/input.component";
import { validations } from "./validations";

@Component({
  selector: "cva-home",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    ErrorMsgComponent
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent {
  form!: FormGroup;
  validations: IErrorMsg = validations;

  constructor(private _fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this._fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      age: ["", [Validators.required]]
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      alert(
        `Name: ${this.form.value.name} - Email: ${this.form.value.email} - Age: ${this.form.value.age}`
      );
    }
  }
}
