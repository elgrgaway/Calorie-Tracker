import { Link, useParams } from "react-router-dom";
export function Detailpage() {
  const params = useParams();
  return (
    <>
      <p>id is {params.recordId}</p>
      <Link to="/" relative="path">
        Go back
      </Link>
    </>
  );
}
