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
			return _user;
			//return new List<User>()
			//{
			//	new User()
			//	{
			//		Id = 1,
			//		Name = "dan",
			//		Picture = "test",
			//		Posts = new List<Post>()
			//		{
			//			new Post()
			//			{
			//				Id = 1,
			//				Content = "test1",
			//				Created = DateTime.Now,
			//				Title = "test1",
			//				UserId = 1
			//			},
			//			new Post()
			//			{
			//				Id = 2,
			//				Content = "test2",
			//				Created = DateTime.Now,
			//				Title = "test2",
			//				UserId = 1
			//			}
			//		}
			//	},
			//	new User()
			//	{
			//		Id = 2,
			//		Name = "nguyen",
			//		Picture = "test",
			//		Posts = new List<Post>()
			//		{
			//			new Post()
			//			{
			//				Id = 3,
			//				Content = "test3",
			//				Created = DateTime.Now,
			//				Title = "test3",
			//				UserId = 2
			//			},
			//			new Post()
			//			{
			//				Id = 4,
			//				Content = "test4",
			//				Created = DateTime.Now,
			//				Title = "test4",
			//				UserId = 2
			//			}
			//		}
			//	}
			//};
		}
	}
}
