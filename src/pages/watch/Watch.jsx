import { ArrowBackOutlined } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import "./watch.scss";
import { Link } from "react-router-dom";

export default function Watch() {
  const location = useLocation();
  const string = location.search;
  const string1 = string.length-1;
  const string3 = string.slice(-string1);
  // console.log(props.location.state);
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="video"
        autoPlay
        controls
        progress
        src={string3}
      />
    </div>
  );
}
