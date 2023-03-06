import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { IDetail, movieDetails } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

export default function MovieDetail() {
  const movieDetail = useRouteMatch<{ movieId: string }>("/movie/:movieId");
  const tvDetail = useRouteMatch<{ tvId: string }>("/tv/:tvId");
  const { data, isLoading } = useQuery<IDetail>(["movie", "details"], () =>
    movieDetails(movieDetail?.params.movieId!)
  );
  const { data: data2 } = useQuery<IDetail>(["movie", "details"], () =>
    movieDetails(tvDetail?.params.tvId!)
  );

  console.log(data?.backdrop_path);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {movieDetail ? (
            <Banner bgPhoto={makeImagePath(data?.backdrop_path || "")}>
              <Title>{data?.title}</Title>
              <Overview>{data?.overview}</Overview>
            </Banner>
          ) : (
            <Banner bgPhoto={makeImagePath(data2?.backdrop_path || "")}>
              <Title>{data2?.title}</Title>
              <Overview>{data2?.overview}</Overview>
            </Banner>
          )}
        </>
      )}
    </Wrapper>
  );
}
