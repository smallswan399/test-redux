using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace test_redux
{
    public class UsersController : ApiController
    {
        public IEnumerable<User> Get()
        {
            return new List<User>()
            {
                new User()
                {
                    Id = 1,
                    Name = "dan",
                    Picture = "test",
                    Posts = new List<Post>()
                    {
                        new Post()
                        {
                            Id = 1,
                            Content = "test1",
                            Created = DateTime.Now,
                            Title = "test1",
                            UserId = 1
                        },
                        new Post()
                        {
                            Id = 2,
                            Content = "test2",
                            Created = DateTime.Now,
                            Title = "test2",
                            UserId = 1
                        }
                    }
                },
              new User()
              {
                Id = 2,
                Name = "nguyen",
                Picture = "test",
                Posts = new List<Post>()
                {
                  new Post()
                  {
                    Id = 3,
                    Content = "test3",
                    Created = DateTime.Now,
                    Title = "test3",
                    UserId = 2
                  },
                  new Post()
                  {
                    Id = 4,
                    Content = "test4",
                    Created = DateTime.Now,
                    Title = "test4",
                    UserId = 2
                  }
                }
              }
            };
        }
    }
}
