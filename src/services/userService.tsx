import { User } from "../contexts/user";

export class UserService {
  public register(user: User): void {
    fetch(`https://ionic-angular-course-6b3ff.firebaseio.com/users.json`, {
      method: 'POST',
      body: JSON.stringify(user)
    }).then((data) => {
      console.log(data);
    })
  }
}