import { Rating } from "react-simple-star-rating"
import { useNavigate } from "react-router-dom"
export default function Card(props) {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/book/${props.id}`, {
          state: {
            bid: props.bid,
            card: {
              title: props.title,
              id: props.id,
              author: props.author,
              myRating: props.myRating,
              img_url: props.img_url,
              notes: props.notes,
            },
          },
        })
      }
    return (
        <div className="small-container space-between border-radius" onClick={handleNavigate}>
        <div>
            <h2>{props.title}</h2>
            <div className="author-container">
              <i>{props.author}</i>
              <div className="stars">
                <Rating
                  readonly="true"
                  initialValue={props.myRating}
                  allowFraction="true"
                  size="20px"
                  fillColor="black"
                  emptyColor="#f2f2f3"
                />
              </div>
            </div>
          </div>
          <div className="image">
            <img src={props.img_url} alt="" />
          </div>
        </div>
    )
}