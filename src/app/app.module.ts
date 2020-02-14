import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CommentComponent } from "./components/comment/comment.component";
import { HttpClientModule } from "@angular/common/http";
import { CommentFormComponent } from "./components/comment-form/comment-form.component";
import { CommentListComponent } from "./components/comment-list/comment-list.component";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    CommentFormComponent,
    CommentListComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
