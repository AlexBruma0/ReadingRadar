import { useSelector } from 'react-redux';

export default function HomePage(){
  const user = useSelector((state) => state.auth.login.user);
  console.log(user)

  return (
    <div>homepage</div>
  )
}