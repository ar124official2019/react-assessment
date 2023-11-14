import "./GithubSearch.css";
import { useState } from "react";
import { GithubSearchResults } from "./GithubSearchResults";
import { useGithubSearch } from "./github-search";


export function GithubSearch() {
  const [err, setErr] = useState(null);
  const [data, setData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const githubSearch = useGithubSearch();

  const search = (page = 1) => {
    githubSearch(searchText, page).then((res) => {
      if (res.error) setErr(res.error);
      else setData(res.data);
      setPageIndex(page - 1);
      window.scrollTo(0, 0);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    search();
  }

  const onPageChange = (pageIndex) => search(pageIndex + 1);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>Search Repository</label>

        <div>
          <input
            type="text"
            placeholder="Repository name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          ></input>

          <button type="submit">Search</button>
        </div>
      </form>

      {err && (
        <div className="error">Something went wrong, while searching!</div>
      )}

      {data && (
        <div className="data">
          <GithubSearchResults
            {...data}
            pageIndex={pageIndex}
            onPageChange={onPageChange}
          ></GithubSearchResults>
        </div>
      )}
    </div>
  );
}
