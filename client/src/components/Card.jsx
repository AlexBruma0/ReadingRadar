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
      className="small-container space-between border-radius"
      onClick={handleNavigate}
    >
      <div>
        <h2>{props.book.title}</h2>
        <div className="author-container">
          <i>{props.book.author}</i>
          <div className="stars">
            <Rating
              readonly="true"
              initialValue={props.book.myRating}
              allowFraction="true"
              size="20px"
              fillColor="black"
              emptyColor="#f2f2f3"
            />
          </div>
        </div>
      </div>
      <div className="image">
        <img src={props.book.img_url} alt="" />
      </div>
    </div>
  );
}