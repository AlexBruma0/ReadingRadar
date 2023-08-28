import { useEffect, useState } from "react";

export default function Form(props) {
  const [data, setData] = useState(props.data);

  const handleChange = (event) => {
    const { key, value } = event.target;
    setData({ ...data, [key]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    if (props.handleUpdate) props.handleUpdate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {data.map((formItem) => (
          <div>
            <label htmlFor="">{formItem.key}</label>
            {formItem.key == "notes" ? (
              <textarea
                type="text"
                name=""
                id=""
                value={formItem.value}
                onChange={handleChange}
              ></textarea>
            ) : (
              <input
                type="text"
                name=""
                id=""
                value={formItem.value}
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
