using WebApiPWA.Models;

namespace WebApiPWA.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly List<User> _users = new()
        {
            new User{id=Guid.NewGuid(),name="Tom",surname="Cruse",country="Poland"},
            new User{id=Guid.NewGuid(),name="Ala",surname="Ma",country="Poland"},
            new User{id=Guid.NewGuid(),name="Fil",surname="Web",country="Croatia"},
            new User{id=Guid.NewGuid(),name="Jon",surname="White",country="Croatia"}


        };

        public void CreateUser(User user)
        {
            _users.Add(user);
        }

        public void DeleteUser(Guid id)
        {
            var index = _users.FindIndex(u => u.id == id);
            _users.RemoveAt(index);
        }

        public User GetById(Guid id)
        {
            return _users.Where(u => u.id == id).SingleOrDefault();
        }

        public IEnumerable<User> GetUsers()
        {
            return _users;
        }

        public IEnumerable<User> GetUsersByCountry(string country)
        {
            return _users.Where(u => u.country == country);
        }

        public void UpdateUser(User user)
        {
            var index = _users.FindIndex(u => u.id == user.id);
            _users[index]=user;
        }
    }
}
