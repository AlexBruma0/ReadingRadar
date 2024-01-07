import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import { useContext } from "react";
import ReactStars from "react-rating-stars-component";


export default function Card({ book, disableOnClick }) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];

  const handleNavigate = () => {
    if (disableOnClick == "true") {
      return;
    } else {
      navigate(`/book/${book._id}`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: currentThemeColors.secondary,
        color: currentThemeColors.text,
      }}
      className={`flex items-center mb-2 justify-between p-4 rounded-lg shadow-md cursor-pointer`}
      onClick={handleNavigate}
    >
      <div className="flex-1 mr-5">
        <h2 className="text-xl font-semibold">{book.title}</h2>
        <p className="text-sm italic">{book.author}</p>
        {book.rating && (
          <div className="flex items-center mt-2">
          <div className="bg-gray-200 z-0 text-xs ßfont-semibold mr-2 px-2.5 py-0.5 rounded ">
            Rating: {book.rating}
          </div>
          <div>
            <ReactStars
              count={5}
              value={book.rating}
              size={15}
              isHalf={true}
              edit={false}
              activeColor={"black"}
            />
          </div>
        </div>
          )}
        
      </div>
      <div className="flex-none">
        <img
          src={book.img_url}
          alt={book.title}
          className="w-16 h-24 rounded"
        />
      </div>
    </div>
  );
}
