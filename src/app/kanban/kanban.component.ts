import { Component } from '@angular/core';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent {
  drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    ev.currentTarget.appendChild(document.getElementById(data));
  }

  createTask() {
    console.log('test');
    var x = document.getElementById('inprogress');
    var y = document.getElementById('done');
    var z = document.getElementById('create-new-task-block');
    if (x.style.display === 'none') {
      x.style.display = 'block';
      y.style.display = 'block';
      z.style.display = 'none';
    } else {
      x.style.display = 'none';
      y.style.display = 'none';
      z.style.display = 'flex';
    }
  }

  saveTask() {
    // var saveButton = document.getElementById("save-button");
    // var editButton = document.getElementById("edit-button");
    // if (saveButton.style.display === "none") {
    //     saveButton.style.display = "block";
    //     editButton.style.display = "none";
    // } else{
    //     saveButton.style.display = "none";
    //     editButton.style.display = "block";
    // }

    var todo = document.getElementById('todo');
    var taskName = document.getElementById('task-name').ariaValueNow;
    todo.innerHTML += `
    <div class="task" id="${taskName
      .toLowerCase()
      .split(' ')
      .join('')}" draggable="true" ondragstart="drag(event)">
        <span>${taskName}</span>
    </div>
    `;
  }

  editTask() {
    var saveButton = document.getElementById('save-button');
    var editButton = document.getElementById('edit-button');
    if (saveButton.style.display === 'none') {
      saveButton.style.display = 'block';
      editButton.style.display = 'none';
    } else {
      saveButton.style.display = 'none';
      editButton.style.display = 'block';
    }
  }
}
