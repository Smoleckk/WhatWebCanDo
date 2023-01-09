using WebApiPWA.Models;

namespace WebApiPWA.Services
{
    public interface IUserService
    {
        public IEnumerable<User> GetUsers();

        void CreateUser(UserDto userDto);
        void UpdateUser(Guid id,UserDto userDto);
        void DeleteUser(Guid id);
        IEnumerable<User> GetUsersByCountry(string country);

    }
}
