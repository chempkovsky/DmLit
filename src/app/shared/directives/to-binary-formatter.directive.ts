
import { Directive, HostListener, ElementRef, OnInit, Input, forwardRef } from "@angular/core";
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ToBinaryPipe } from './../pipes/to-binary.pipe';

 @Directive({ 
   selector: '[toBinaryFormatter]',
   providers: [
     {
       provide: MAT_INPUT_VALUE_ACCESSOR, 
       useExisting: forwardRef(() => ToBinaryFormatterDirective)
     },
     {
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => ToBinaryFormatterDirective),
       multi: true,
     }
   ],   
 })
export class ToBinaryFormatterDirective implements ControlValueAccessor, OnInit {
  protected _value: string | null;
    
    constructor(protected elementRef: ElementRef<HTMLInputElement>, protected tobinaryPipe: ToBinaryPipe) {
    }
  
    ngOnInit() {
      
    }
    @Input('value')
    get value(): string | null {
      return this._value;
    }    
    set value(value: string | null) {
      this._value = value;
      this.formatValue();
    }
    private formatValue() {
      if (this._value !== null) { 
        this.elementRef.nativeElement.value = this.tobinaryPipe.transform(this._value);
      } else {
        this.elementRef.nativeElement.value = '';
      }
    }
    private unFormatValue() {
      if (this._value) {
        this.elementRef.nativeElement.value = this._value; 
      } else {
        this.elementRef.nativeElement.value = '';
      }
    }
    @HostListener('input', ['$event.target.value'])
    onInput(value) {
      this._value = this.tobinaryPipe.parse(value);
      this._onChange(this._value);
    }    
    _onChange(value: any): void {
    }    
    @HostListener('blur')
    _onBlur() {
      this._value = this.tobinaryPipe.parse(this.elementRef.nativeElement.value);
      this.formatValue(); 
    }   
    @HostListener('focus')
    onFocus() {
      this.unFormatValue(); 
    }     
    writeValue(value: any): void {
      this._value = this.tobinaryPipe.parse(value);
      this.formatValue(); 
    }
    registerOnChange(fn: (value: any) => void) {
      this._onChange = fn;
    }
    registerOnTouched(fn: any): void {
      
    }
}

