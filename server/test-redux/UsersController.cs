using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using RandomStringGenerator;

namespace test_redux
{
	public class UsersController : ApiController
	{
		private readonly StringGenerator _generator = new StringGenerator();
		private List<User> _user = new List<User>();
		private int userId = 0;
		private int postId = 0;
		private User GetRandomUser()
		{
			userId++;
			var user = new User()
			{
				Id = userId,
				Name = _generator.GenerateString(20),
				Picture = _generator.GenerateString(20),
				Posts = new List<Post>()
			};
			for (int i = 1; i <= 30; i++)
			{
				postId++;
				user.Posts.Add(new Post()
				{
					Content = _generator.GenerateString(20),
					Created = DateTime.Now,
					Id = postId,
					Title = _generator.GenerateString(20),
					UserId = userId
				});
			}
			return user;
		}

		public UsersController()
		{
			for (int i = 1; i <= 30; i++)
			{
				_user.Add(GetRandomUser());
			}
		}
		public IEnumerable<User> Get()
		{
			return _user.Select(s => new User()
			{
				Id = s.Id,
				Name = s.Name,
				Picture = s.Picture
			});
		}
	}
}
