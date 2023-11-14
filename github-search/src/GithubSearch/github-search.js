import { useContext } from "react";
import { GithubContext } from "./github.config";

export function useGithubSearch() {
  const githubSettings = useContext(GithubContext);

  return (searchText, page) => {
    return fetch(
      `${githubSettings.baseURI}/search/repositories?q=${searchText}&page=${page}&per_page=${githubSettings.perPage}`,
      {
        headers: {
          "X-GitHub-Api-Version": githubSettings.apiVersion,
        },
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          return {
            error: true,
            data: null,
          };
        }

        const { total_count, items } = await res.json();
        return {
          data: {
            count: total_count,
            items: items.map((i) => ({
              id: i.id,
              name: i.name,
              description: i.description,
              pages: !!i.has_pages
                ? `https://${i.owner.login}.github.io/${i.name}`
                : ``,
            })),
          },
          error: null,
        };
      })
      .catch(() => ({ error: true, data: null }));
  };
}
