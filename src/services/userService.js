export class UserService {
  async getAll() {
    const users = [];
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
  register(user) {
    fetch(`https://ionic-angular-course-6b3ff.firebaseio.com/users.json`, {
      method: 'POST',
      body: JSON.stringify(user)
    }).then((data) => {
      console.log(data);
    })
  }
}