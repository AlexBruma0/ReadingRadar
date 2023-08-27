import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Rating } from "react-simple-star-rating";
function Book() {
  const location = useLocation();
  const book = location.state?.card;
  return (
    <>
      <Navbar></Navbar>
      <div className="large-container">
        <h1 className="underline center-text"> {book.title}</h1>
        <div className="space-between">
          <div className="margin">
            <img src={book.cover_img} className="large-img" alt="" />
            <h2>
              <i>{book.author}</i>
            </h2>
            <div>
              <Rating
                readonly="true"
                allowFraction="true"
                initialValue={book.rating}
                size="50px"
                fillColor="var(--secondary-color)"
                emptyColor="#f2f2f3"
              />
            </div>
          </div>
          <div className="primary-backround-color border-radius">
            <p >
              {" "}
              Lorem ipsum odor amet, consectetuer adipiscing elit. Felis lectus
              per ipsum efficitur sodales donec aptent feugiat nostra. Sociosqu
              ridiculus nisl lobortis integer metus neque ipsum. Lobortis
              habitant dignissim dictum lacus pellentesque eget euismod at.
              Rutrum nisi lobortis natoque commodo dis dui facilisis aenean.
              Ornare a iaculis scelerisque fringilla mi dui. Vivamus per
              habitant integer conubia hendrerit finibus nec; quam tellus.
              Pharetra interdum consectetur proin natoque volutpat sollicitudin
              lacus magna. Vehicula montes ullamcorper montes euismod vel
              posuere gravida ut nunc. Primis vel taciti litora ipsum semper
              elit. Fusce iaculis quam turpis dapibus ipsum. Dolor mattis
              adipiscing potenti nibh ultrices efficitur quam! Lorem dolor fusce
              senectus; porta congue ac tortor dui scelerisque. Cursus maximus
              leo facilisis scelerisque convallis. Pretium aenean in tellus
              sagittis ultricies curabitur libero. Nam platea euismod iaculis
              ipsum lectus orci purus! Laoreet platea per litora litora cras
              fringilla curae. Etiam dictum pulvinar senectus quisque et.
              Egestas dictum facilisi rhoncus condimentum nisi. Risus himenaeos
              leo sem elit enim senectus. Pellentesque class hac vulputate
              sapien torquent curae cras purus. Inceptos condimentum consequat
              rutrum a; maximus erat. Tincidunt adipiscing hac hendrerit sem at
              magnis.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Book;
