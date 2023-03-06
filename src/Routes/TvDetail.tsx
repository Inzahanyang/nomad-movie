import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { IDetail, movieDetails, tvDetails } from "../api";
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

export default function TvDetail() {
  const tvDetail = useRouteMatch<{ tvId: string }>("/tv/:tvId");
  const { data, isLoading } = useQuery<IDetail>(["tv", "details"], () =>
    tvDetails(tvDetail?.params.tvId!)
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.backdrop_path || "")}>
            <Title>{data?.name}</Title>
            <Overview>{data?.overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}
