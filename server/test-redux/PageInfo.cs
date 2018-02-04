using System.Collections.Generic;
using Newtonsoft.Json;

namespace test_redux
{
	public class PagedList<T>
	{
		[JsonProperty(PropertyName = "list")]
		public IEnumerable<T> List { get; set; }

		[JsonProperty(PropertyName = "page")]
		public int Page { get; set; }

		[JsonProperty(PropertyName = "size")]
		public int Size { get; set; }

		[JsonProperty(PropertyName = "count")]
		public long Count { get; set; }
	}
}