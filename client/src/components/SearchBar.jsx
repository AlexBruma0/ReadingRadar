import Modal from "./Modal";
export default function SearchBar(props) {
  return (
    <Modal
      open={props.open}
      setOpen={props.setOpen}
      className="full-width secondary-backround-color searchBar"
      search="true"
    >
      <input placeholder="🔎 Search for book" type="text" />
    </Modal>
  );
}
