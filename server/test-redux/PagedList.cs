﻿using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace test_redux
{
	public class PageInfo
	{
		[JsonProperty(PropertyName = "page")]
		public int Page { get; set; }

		[JsonProperty(PropertyName = "size")]
		public int Size { get; set; }

		[JsonProperty(PropertyName = "count")]
		public long Count { get; set; }
	}
	public class PagedList<T>
	{
		[JsonProperty(PropertyName = "list")]
		public List<T> List { get; set; }

		[JsonProperty(PropertyName = "pageInfo")]
		public PageInfo PageInfo { get; set; }
		
	}
}