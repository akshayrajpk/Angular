import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-dropdown-multiselect',
  templateUrl: './dropdown-multiselect.component.html',
  styleUrls: ['./dropdown-multiselect.component.scss']
})
export class DropdownMultiselectComponent implements OnInit {

  @Input()
  LabelText: string | undefined;
  @Input() selectionList: any[] | undefined;
  @Output() selectedDropDownItems = new EventEmitter<any>();

  @ViewChild('allSelected')
   allSelected!: MatOption;

  selections = new FormControl('');

  ngOnInit(): void {
    this.selections.valueChanges.subscribe((values) => {
      this.selectedDropDownItems.emit(values);
    });
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.selections.patchValue([]);
    }
  }


}
