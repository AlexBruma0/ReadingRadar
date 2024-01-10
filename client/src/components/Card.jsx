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
        <h2 className="text-2xl font-semibold font-serif">{book.title}</h2>
        <p className="text-sm italic">{book.author}</p>
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
