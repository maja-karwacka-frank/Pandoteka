import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import classes from "./Logout.module.css";
import logoutPanda from "../../Graphics/logout-panda.png";
import Timer from "../Timer/Timer";
import useTimeout from "../useTimeout/useTimeout";

export const Logout = (): JSX.Element => {
      const navigate: NavigateFunction = useNavigate();
      useTimeout(() => navigate('/'), 5000)

  return (
    <div className={classes.logout}>
      <img src={logoutPanda} height='250' width='250' alt='' />
      <div className={classes.textcontent}>
        <h2>You've been logged out</h2>
        <div className={classes.remember}>
          <h4>Please remember about me or&nbsp;</h4>
          <button className={classes.logoutbutton}>
            <Link to="/login">
              Log in
            </Link>
          </button>
        </div>
        <p className={classes.redirect}>Redirecting in&nbsp;<Timer/>&nbsp;seconds</p>
      </div>
    </div>
  );
};
