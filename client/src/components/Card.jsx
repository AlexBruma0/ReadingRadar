import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../components/ThemeContext';
import { themes } from '../themes';
import { useContext } from "react";

export default function Card(props) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];


  const handleNavigate = () => {
    if(props.navigate == 'false'){
      return;
    } else {
      navigate(`/book/${props.book._id}`);
    }
  }

  return (
    <div style={{ backgroundColor: currentThemeColors.secondary, color: currentThemeColors.text  }} className={`flex items-center mb-1 justify-between p-4 rounded-lg shadow-md cursor-pointer`} onClick={handleNavigate}>
      <div className="flex-1 mr-5">
        <h2 className="text-xl font-semibold">{props.book.title}</h2>
        <p className="text-sm italic">{props.book.author}</p>
        <div className="flex items-center mt-2">
          {/* <Rating
            readonly
            initialValue={props.book.rating}
            allowFraction
            size="20px"
            fillColor="black"
            emptyColor="#f2f2f3"
            className="flex-col" // Ensures the stars are laid out in a row
          /> */}
        </div>
      </div>
      <div className="flex-none">
      <img src={props.book.img_url} alt={props.book.title} className="w-16 h-24 rounded" />
      </div>
    </div>
  );
}