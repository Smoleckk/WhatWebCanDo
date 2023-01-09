using Microsoft.AspNetCore.Mvc;
using WebApiPWA.Models;
using WebApiPWA.Services;

namespace WebApiPWA.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return Ok(userService.GetUsers());
        }

        [HttpPost]
        public ActionResult CreateUser([FromBody] UserDto userDto)
        {
            userService.CreateUser(userDto);

            return Ok("User crated successfully");
        }
        [HttpDelete("{id}")]
        public ActionResult DeleteUser(Guid id)
        {
            userService.DeleteUser(id);

            return Ok("User deleted successfully");
        }
        [HttpPut("{id}")]
        public ActionResult UpdateUser(Guid id, [FromBody] UserDto userDto)
        {
            userService.UpdateUser(id, userDto);

            return Ok("User updated successfully");
        }
        [HttpGet("{country}")]
        public ActionResult<IEnumerable<User>> GetUsersByCountry(string country)
        {
            return Ok(userService.GetUsersByCountry(country));
        }
    }
}
