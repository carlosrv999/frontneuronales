import { Component, OnInit } from '@angular/core';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {
  public formgroup: FormGroup;
  public themeColors(): void {
    Array.from(document.querySelectorAll('.theme-color')).forEach(function(el) {
      const elem = document.getElementsByClassName(el.classList[0])[0];
      const background = getStyle('background-color', elem);

      const table = document.createElement('table');
      table.innerHTML = `
        <table class="w-100">
          <tr>
            <td class="text-muted">HEX:</td>
            <td class="font-weight-bold">${rgbToHex(background)}</td>
          </tr>
          <tr>
            <td class="text-muted">RGB:</td>
            <td class="font-weight-bold">${background}</td>
          </tr>
        </table>
      `;

      el.parentNode.appendChild(table);
    });

  }

  createform() {
    this.formgroup = this.fb.group({
      'area': [0, Validators.required],
      'riesgo_deslizamiento': [1, Validators.required],
      'riesgo_inundacion': [0, Validators.required],
      'mov_masas': [1, Validators.required],
      'inundacion': [1, Validators.required],
      'infra_niv_i': [0, Validators.required],
      'infra_niv_ii': [0, Validators.required],
      'infra_niv_iii': [0, Validators.required]
    });
  }

  submitForm() {
    console.log(this.formgroup.value);
  }

  constructor(
    private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.themeColors();
    this.createform();
  }
}
