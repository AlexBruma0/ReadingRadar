import Layout from "../components/Layout";
import Users from "../components/Users";

const UsersPage = () => {
  return (
    <Layout>
      <div className="font-bold my-4 text-3xl ml-2 bg-white">
        People you may know
      </div>
      <Users />
    </Layout>
  );
};

export default UsersPage;
