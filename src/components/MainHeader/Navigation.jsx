import { useContext } from "react";
import classes from "./Navigation.module.css";
import AuthContext from "../../store/AuthContext";

const Navigation = () => {
  const { isLoggedIn, logoutHandler } = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

// import AuthContext from "../../store/AuthContext";
// import classes from "./Navigation.module.css";

// const Navigation = () => {
//   return (
//     <AuthContext.Consumer>
//       {({ isLoggedIn, logoutHandler }) => {
//         return (
//           <nav className={classes.nav}>
//             <ul>
//               {isLoggedIn && (
//                 <li>
//                   <a href="/">Users</a>
//                 </li>
//               )}
//               {isLoggedIn && (
//                 <li>
//                   <a href="/">Admin</a>
//                 </li>
//               )}
//               {isLoggedIn && (
//                 <li>
//                   <button onClick={logoutHandler}>Logout</button>
//                 </li>
//               )}
//             </ul>
//           </nav>
//         );
//       }}
//     </AuthContext.Consumer>
//   );
// };

// export default Navigation;
