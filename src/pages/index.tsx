import { withUrqlClient } from "next-urql";
import { Navbar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery()
  return (
    <>
      <Navbar />
      <div>Hello WOrld</div>
      <br></br>
      {!data ? <p>loading...</p> : data.posts.map(p => <div key={p.id}>{p.title}</div>)}
    </>
  )

}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
