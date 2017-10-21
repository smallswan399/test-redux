using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace test_redux
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
        public IEnumerable<Post> Posts { get; set; }
    }

    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public int UserId { get; set; }
    }
}
