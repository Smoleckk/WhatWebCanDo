using WebApiPWA.Models;

namespace WebApiPWA.Repositories
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();
        User GetById(Guid id);
        void CreateUser(User user);
        void UpdateUser(User user);
        void DeleteUser(Guid id);

        IEnumerable<User> GetUsersByCountry(string country);

    }
}
