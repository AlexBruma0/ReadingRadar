import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
export default function Form(props) {
  const [data, setData] = useState(props.data);
  const [fetching, setFetching] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.handleUpdate) props.handleUpdate(props.bid, data);
    if (props.toggleOpen) props.toggleOpen();
  };

  const handleFetch = async () => {
    console.log("handleFetch", data);
    if (props.handleFetch) {
      setFetching(true)
      const response = await props.handleFetch(data.asin);
      setData({
        ...data,
        title: response.title,
        author: response.author,
        img_url: response.img_url,
      });
      setFetching(false)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {fetching ? (
          <div className="center-text">
            <div className="large-text">
                Fetching data from amazon...

            </div>
            <SpinnerCircular 
            color="pink"
            size='30vh'
            />
            
          </div>
        ) : (
          <div>
            {Object.keys(data).map((key) => (
              <div>
                <div>{key == "id" ? "" : key}</div>
                {key == "notes" ? (
                  <textarea
                    className="margin-bottom"
                    key={key}
                    type="text"
                    rows={10}
                    cols={50}
                    name={key}
                    value={data[key]}
                    onChange={handleChange}
                  ></textarea>
                ) : key == "id" ? (
                  <></>
                ) : key == "asin" ? (
                  <div className="flexbox">
                    <input
                      className="margin-bottom"
                      type="text"
                      key={key}
                      name={key}
                      value={data[key]}
                      onChange={handleChange}
                    />
                    <button onClick={handleFetch}>Enter</button>
                  </div>
                ) : (
                  <input
                    className="margin-bottom"
                    type="text"
                    key={key}
                    name={key}
                    value={data[key]}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <button
          className="large-text full-width border-radius secondary-backround-color"
          type="submit"
        >
          save
        </button>
      </form>
    </>
  );
}
