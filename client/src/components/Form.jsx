import { useEffect, useState } from "react";

export default function Form(props) {
  const [data, setData] = useState(props.data);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.handleUpdate) props.handleUpdate(props.bid, data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {Object.keys(data).map((key) => ( 
          <div>
            <label htmlFor="">{key == 'id'? '': key}</label>
            {key == "notes" ? (
              <textarea
                key={key}
                type="text"
                name={key}
                value={data[key]}
                onChange={handleChange}
              ></textarea>
            ) : key == 'id' ? (
              <></>
            ) :
            <input
            type="text"
            key={key}
            name={key}
            value={data[key]}
            onChange={handleChange}
          />}
          </div>
        ))}
        <button type="submit">save</button>
      </form>
    </>
  );
}
