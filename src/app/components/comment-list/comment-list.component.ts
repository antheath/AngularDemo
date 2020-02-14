import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-comment-list",
  templateUrl: "./comment-list.component.html",
  styleUrls: ["./comment-list.component.sass"]
})
export class CommentListComponent implements OnInit {
  constructor(private dataService: DataService) {}

  comments: any = [];
  tags: string[] = [];
  selectedTag: string = "";
  filteredComments: any = [];

  onFilterChange($event): void {
    this.selectedTag = $event.target.value;
    if (this.selectedTag) {
      this.filteredComments = this.comments.filter(comment =>
        comment.tags.includes(this.selectedTag)
      );
    } else {
      this.filteredComments = [];
    }
  }

  getComments(): void {
    let subscription = this.dataService.getComments().subscribe(data => {
      this.comments.push(...data);
      this.updateTags();
      subscription.unsubscribe();
    });
  }

  onCreate(data): void {
    this.comments.push(data);
    this.updateTags();
  }

  onRemove(data): void {
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].id === data.id) {
        this.comments.splice(i, 1);
      }
    }
    this.updateTags();
  }

  onUpdate(data): void {
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].id === data.old.id) {
        this.comments[i] = data.new;
      }
    }
    this.updateTags();
  }

  updateTags(): void {
    for (let item of this.comments) {
      //this.tags = [];
      item.tags.forEach(tag => {
        if (!this.tags.includes(tag)) {
          this.tags.push(tag);
        }
      });
    }
  }

  ngOnInit(): void {
    this.getComments();
  }
}
