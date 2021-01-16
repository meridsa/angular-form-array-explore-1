import { Component, OnInit, VERSION } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

class House {
  address: string;
  material: Material;
  residents: string[];
  area: number;

  constructor(
    address: string,
    material: Material,
    residents: string[],
    area: number
  ) {
    this.address = address;
    this.material = material;
    this.residents = residents;
    this.area = area;
  }
}

enum Material {
  Wood,
  Cement,
  Brick,
  Stone,
  Mud
}

const HOUSE = new House(
  "12 Marshall vue",
  Material.Brick,
  ["Martha", "John", "Annie"],
  122
);

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular " + VERSION.major;
  materials = Object.keys(Material).filter(k => isNaN(Number(k)));
  houseForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    if (HOUSE != null) {
      this.houseForm.patchValue(HOUSE);
      this.residents.clear();
      HOUSE.residents.forEach( resident => {
        this.residents.push(this.fb.control(resident))
      });
    }
  }

  initForm() {
    this.houseForm = this.fb.group({
      address: [""],
      material: [""],
      residents: this.fb.array([this.fb.control("")]),
      area: [""]
    });
  }

  addResident() {
    this.residents.push(this.fb.control(""));
  }

  removeResident(index: number) {
    this.residents.removeAt(index);
  }

  get residents(): FormArray {
    return this.houseForm.get("residents") as FormArray;
  }
}
