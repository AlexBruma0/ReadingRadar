import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
export default function Card(props) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if(props.navigate == 'false'){
      return;
    } else {
      navigate(`/book/${props.book._id}`);
    }
    
  };
  return (
    <div
      className=""
      onClick={handleNavigate}
    >
      <div>
        <h2>{props.book.title}</h2>
        <div className="">
          <i>{props.book.author}</i>
        </div>
        {props.book.rating > 0 ?
          (<div className="">
          <Rating
            readonly="true"
            initialValue={props.book.rating}
            allowFraction="true"
            size="20px"
            fillColor="black"
            emptyColor="#f2f2f3"
          />
        </div>) :
        (<i>no rating</i> )
          }
      </div>
      <div className="">
        <img src={props.book.img_url} alt="" />
      </div>
    </div>
  );
}