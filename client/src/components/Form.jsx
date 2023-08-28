import { useEffect, useState } from "react";

export default function Form(props) {
  const [data, setData] = useState(props.data);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    if (props.handleUpdate) props.handleUpdate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {Object.keys(data).map((key) => (

          <div>
            <label htmlFor="">{key}</label>
            {key == "notes" ? (
              <textarea
                key={key}
                type="text"
                name={key}
                value={data[key]}
                onChange={handleChange}
              ></textarea>
            ) : (
              <input
                type="text"
                key={key}
                name={key}
                value={data[key]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <button type="submit">save</button>
      </form>
    </>
  );
}
