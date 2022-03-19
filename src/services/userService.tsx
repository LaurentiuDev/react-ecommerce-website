import { User } from "../contexts/user";

export class UserService {
  public async getAll(): Promise<User[]> {
    const users: User[] = [];
    await fetch(`https://ionic-angular-course-6b3ff.firebaseio.com/users.json`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then((data) => {
      Object.keys(data).forEach((key) => {
        data[key].id = key;
        users.push(data[key]);
      });
      console.log(data);
    });

    //users = await response.then();

    return users;
  } 
  public register(user: User): void {
    fetch(`https://ionic-angular-course-6b3ff.firebaseio.com/users.json`, {
      method: 'POST',
      body: JSON.stringify(user)
    }).then((data) => {
      console.log(data);
    })
  }
}