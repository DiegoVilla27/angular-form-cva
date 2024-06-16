import { Component, Input, Optional, Self } from "@angular/core";
import { FormsModule, NgControl } from "@angular/forms";

@Component({
  selector: "cva-input",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss"
})
export class InputComponent {
  @Input() type: string = "text";
  @Input() placeholder: string = "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedValue: any;

  /**
   * In the component constructor we inject NgControl, and we mark it with the @Self() and @Optional() decorators. The first one tells the Angular dependency injection system that our component is the NgControl (CVA). And the second one marks as optional the use of our component in forms. Inside the constructor we initialize the component variables with a default value.
   * */
  constructor(@Self() @Optional() private ngControl: NgControl) {
    // If the component is being used as a form control.
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    // Otherwise the default AVC functions are initialised.
    else {
      this.onChange = () => null;
      this.onTouched = () => null;
    }
  }

  // Function to call when the value changes.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  onChange = (value: any) => {};

  // Function to call when the label is touched.
  onTouched = () => {};

  // Receives the value of the form control in our component.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeValue(value: any): void {
    this.selectedValue = value;
    this.onChange(value);
  }

  // It provides us with the necessary function to indicate to the form control that the value of our component has changed.
  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  // It provides the necessary function to indicate to the form control that the status of the component has changed.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // We receive the value of the form control each time it is enabled or disabled in our component.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDisabledState(isDisabled: boolean): void {}
}
