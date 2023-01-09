using WebApiPWA.Models;
using WebApiPWA.Repositories;

namespace WebApiPWA.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public void CreateUser(UserDto userDto)
        {
            User user = new()
            {
                id = Guid.NewGuid(),
                name = userDto.name,
                surname = userDto.surname,
                country = userDto.country
            };

            userRepository.CreateUser(user);
        }

        public void DeleteUser(Guid id)
        {
            var deleteUser = userRepository.GetById(id);
            if(deleteUser == null)
            {
                throw new Exception("Not found");
            }

            userRepository.DeleteUser(id);

        }

        public IEnumerable<User> GetUsers()
        {
            return userRepository.GetUsers();
        }

        public IEnumerable<User> GetUsersByCountry(string country)
        {
            return userRepository.GetUsersByCountry(country);
        }

        public void UpdateUser(Guid id, UserDto userDto)
        {
            var existingUser = userRepository.GetById(id);
            if(existingUser == null)
            {
                throw new Exception("Not found");
            }

            User updatedUser = new()
            {
                id = id,
                name = userDto.name,
                surname = userDto.surname,
                country = userDto.country
            };
            userRepository.UpdateUser(updatedUser);
        }
    }
}
