import { Injectable } from '@angular/core';
import { Task } from '../task/task.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  path = '/tasks';
  ref: AngularFirestoreCollection<Task> = null;

  constructor(private firestore: AngularFirestore) {
    this.ref = firestore.collection(this.path, ref => ref.orderBy('title', 'asc'));
  }
  getTasks(): AngularFirestoreCollection<Task> {
    return this.ref;
  }
  getTask(key: string): AngularFirestoreDocument {
    return this.ref.doc(key);
  }
  createTask(task: Task): void {
    this.ref.add({...task});
  }
  shareTask(id: string, users: string[]) {
    this.ref.doc(id).update({users: [...users]});
  }
  updateTask(key: string, val: any): Promise<void> {
    return this.ref.doc(key).update(val);
  }
  deleteTask(key: string): Promise<void> {
    return this.ref.doc(key).delete();
  }
}
