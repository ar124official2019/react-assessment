import './App.css';
import { GithubSearch } from "./GithubSearch/GithubSearch";
import { GithubContext } from './GithubSearch/github.config';

function App() {
  return (
    <div className="App">
      <GithubContext.Provider
        value={{
          baseURI: "https://api.github.com",
          apiVersion: "2022-11-28",
          perPage: 50,
        }}
      >
        <GithubSearch />
      </GithubContext.Provider>
    </div>
  );
}

export default App;
