const admins = ['user33333@mail.ru'];

export const admin = admins.find((value) => {
    const email = localStorage.getItem('email');
        return value === email;
      });
  