import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import MovieDetail from "./Routes/MovieDetail";
import TvDetail from "./Routes/TvDetail";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={["/tvs", "/tvs/:tvId"]}>
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/tv/:tvId">
          <TvDetail />
        </Route>
        <Route path="/movie/:movieId">
          <MovieDetail />
        </Route>
        <Route path={["/", "/movies/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
