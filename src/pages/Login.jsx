import { Outlet, Link } from "react-router-dom";

const Login = () =>{
    return (<>
            <form action="">
            <input type="text" name="" id="" placeholder="Enter username:"/>
            <input type="text" placeholder="Enter passwork:" />


        </form>

        <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
 
        </ul>
      </nav>

      <Outlet />
    

    </>


    )
}
export default Login