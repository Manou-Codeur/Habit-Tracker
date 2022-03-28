import { ReactComponent as NotFoundVector } from "../../Assets/img/notFound-Vector.svg";

import "./notFound.scss";

const NotFound = () => {
  return (
    <div className="notFound">
      <NotFoundVector className="notFound__svg" />
    </div>
  );
};

export default NotFound;
