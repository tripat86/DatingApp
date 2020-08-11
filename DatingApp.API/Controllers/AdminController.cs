using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public AdminController(IMapper mapper, DataContext context, UserManager<User> userManager, IDatingRepository repo)
        {
            _mapper = mapper;
            _repo = repo;
            _userManager = userManager;
            _context = context;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("usersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var roles = await _context.Users.OrderBy(u => u.UserName)
                        .Select(user => new
                        {
                            Id = user.Id,
                            UserName = user.UserName,
                            Roles = (from userRoles in user.UserRoles
                                     join role in _context.Roles
                                     on userRoles.RoleId
                                     equals role.Id
                                     select role.Name).ToList()
                        }).ToListAsync();
            return Ok(roles);
        }

        [HttpPost("editRoles/{username}")]
        public async Task<IActionResult> EditRoles(string username, RoleEditDto roleEditDto)
        {
            var user = await _userManager.FindByNameAsync(username);

            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.RoleNames;

            selectedRoles = selectedRoles ?? new string[] { };

            // Roles that have been newly selected by user on UI
            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded)
                return BadRequest("Failed to add Roles");

            // Roles that have been de-selected by the user
            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded)
                return BadRequest("Failed to remove the roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photosForModeration")]
        public IActionResult GetPhotosForModeration()
        {
            return Ok("Only admin can see this");
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photosForApproval")]
        public async Task<IActionResult> GetPhotosForApproval()
        {
            var photosFromRepo = await this._repo.GetPhotosForApproval();
            var photosToReturn = _mapper.Map<IEnumerable<PhotosForDetailedDto>>(photosFromRepo);
            return Ok(photosToReturn);
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("photoStatusUpdate/{id}/{status}")]
        public async Task<IActionResult> PhotoStatusUpdate(int id, string status)
        {
            Photo photoFromRepo = await _repo.GetPhoto(id);
            if(photoFromRepo != null) {
                switch(status) 
                {
                case "Activate":
                    photoFromRepo.IsApproved = true;
                    await _repo.SaveAll();
                    break;
                case "Reject":
                    _repo.Delete(photoFromRepo);
                    await _repo.SaveAll();
                    break;
                default:
                    break;
                }
            }
            return Ok(photoFromRepo);
        }
    }
}