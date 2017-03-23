using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Globalization;
using System.Web.Security;

namespace Tic_Tack_Jack.Models
{
    public class UsersContext : DbContext
    {
        public UsersContext()
            : base("AppDataContext")
        {
        }

        public DbSet<UserProfile> UserProfiles { get; set; }
    }

    [Table("UserProfile")]
    public class UserProfile
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string UserName { get; set; }
    }

    public class RegisterExternalLoginModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        public string ExternalLoginData { get; set; }
    }

    public class LocalPasswordModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Núverandi lykilorð")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "{0} verður að vera að minnsta kosti {2} stafa langt.", MinimumLength = 8)]
        [DataType(DataType.Password)]
        [Display(Name = "Nýtt lykilorð")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Staðfesta nýtt lykilorð")]
        [Compare("NewPassword", ErrorMessage = "Nýtt lykilorð og staðfestingarlykilorð er ekki það sama.")]
        public string ConfirmPassword { get; set; }

        public int Chips { get; set; }
        public int Likes { get; set; }
        public int totalGames { get; set; }
        public int BJWins { get; set; }
        public int BJLoss { get; set; }
        public int TICWins { get; set; }
        public int TICLoss { get; set; }


    }

    public class LoginModel
    {
        [Required]
        [Display(Name = "Notandanafn")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Lykilorð")]
        public string Password { get; set; }

        [Display(Name = "Muna eftir mér?")]
        public bool RememberMe { get; set; }
    }

    public class RegisterModel
    {
        [Required]
        [Display(Name = "Notendanafn")]
        public string UserName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "{0} verður að vera að minnsta kosti {2} stafa langt.", MinimumLength = 8)]
        [DataType(DataType.Password)]
        [Display(Name = "Lykilorð")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Staðfesta lykilorð")]
        [Compare("Password", ErrorMessage = "Nýtt lykilorð og staðfestingarlykilorð er ekki það sama.")]
        public string ConfirmPassword { get; set; }

        [Required]
        public string AcceptAgreement { get; set; }

    }

    public class ExternalLogin
    {
        public string Provider { get; set; }
        public string ProviderDisplayName { get; set; }
        public string ProviderUserId { get; set; }
    }
}
