import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../auth/auth.model';

@Pipe({
  name: 'taskShare'
})
export class TaskSharePipe implements PipeTransform {

  transform(users: User[], taskUsers: string[]): any {
    if (!users) {
      return null;
    }
    return users.filter(el =>  {
      return taskUsers.indexOf(el.login) === -1;
    });
  }

}
