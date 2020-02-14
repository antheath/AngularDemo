import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CommentItem } from "../../comment-item";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.sass"]
})
export class CommentComponent implements OnInit {
  @Input() comment;
  @Input() tags;
  @Output() remove = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() create = new EventEmitter();

  model = new CommentItem(0, "Comment Title", "Set a description", []);
  tagModel: any;
  editMode: Boolean = false;
  textWithMath: string;

  constructor() {}

  edit(): void {
    this.editMode = true;
    this.model.id = this.comment.id;
    this.model.title = this.comment.title;
    this.model.text = this.comment.text;
    this.model.tags = this.comment.tags;
  }

  cancel(): void {
    this.editMode = false;
  }

  save(): void {
    if (this.comment === "new") {
      this.create.emit(this.model);
    } else {
      this.update.emit({ old: this.comment, new: this.model });
      this.detectMath();
    }
  }

  onTagKey($event) {
    if ($event.target.value.trim().length > 0) {
      console.log($event);
      if ($event.key === "Enter" || $event.code === "Space") {
        if (!this.model.tags.includes($event.target.value)) {
          this.model.tags.push($event.target.value);
        }
        $event.target.value = "";
      }
    }
  }

  onTagChange($event) {
    let val = $event.target.value;
    console.log(this.model.tags, $event.target.value);
    if (val !== "" && !this.model.tags.includes(val)) {
      this.model.tags.push(val);
    }
    $event.target.value = "";
  }

  onTagClick(tag) {
    let index = this.model.tags.indexOf(tag);
    if (index >= 0) {
      this.model.tags.splice(index, 1);
    }
  }

  ngOnInit(): void {
    if (this.comment === "new") {
      this.editMode = true;
    }
    this.detectMath();
  }

  detectMath(): void {
    let regex = /\d[\+||\-]\d/;
    if (regex.test(this.comment.text)) {
      let textArr = this.comment.text.split(" ");
      for (let i = 0; i < textArr.length; i++) {
        if (regex.test(textArr[i])) {
          let result = this.calculate(textArr[i]);
          textArr[i] = `<em><strong>${result}</strong></em>`;
        }
      }
      this.textWithMath = textArr.join(" ");
    }
  }

  calculate(str: string): number {
    let components = str.split("");
    let results = Number(components[0]);
    for (let i = 1; i < components.length; i++) {
      if (components[i] === "+") {
        results += Number(components[i + 1]);
      }
      if (components[i] === "-") {
        results -= Number(components[i + 1]);
      }
    }
    return results;
  }
}
