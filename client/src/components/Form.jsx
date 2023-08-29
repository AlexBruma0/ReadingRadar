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
    if(props.toggleOpen) props.toggleOpen()
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {Object.keys(data).map((key) => ( 
          <div>
            <div>{key == 'id'? '': key}</div>
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
            ) : key == 'id' ? (
              <></>
            ) :
            <input
            className="margin-bottom"
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
