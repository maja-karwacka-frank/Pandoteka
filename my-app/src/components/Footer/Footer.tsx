import classes from "./Footer.module.css";
import logoNoImg from "../../Graphics/logo-no-img.png";
import githubLogo from "../../Graphics/github-logo.png";
import liLogo from "../../Graphics/LI-logo.png";

export const Footer = () => {
  return (
    <footer>
      <a href="#">
        <img
          className={classes["footer-logo"]}
          src={logoNoImg}
          alt="Pandoteka"
        />
      </a>
      <div>Pandoteka is a project created at Infoshare Academy by:</div>
      <ul>
        <li>
          <span>Maja Karwacka-Frank</span>
          <a target='_blank' href="https://github.com/maja-karwacka-frank">
            <img
              className={classes["footer-small-logos"]}
              src={githubLogo}
              alt="github"
            />
          </a>
          <a target='_blank' href="https://www.linkedin.com/in/maja-karwacka-frank/">
            <img
              className={classes["footer-small-logos"]}
              src={liLogo}
              alt="LI"
            />
          </a>
        </li>
        <li>
          <span>Łukasz Śmigiel</span>
          <a target='_blank' href="https://github.com/L-Smigiel">
            <img
              className={classes["footer-small-logos"]}
              src={githubLogo}
              alt="github"
            />
          </a>
          <a target='_blank' href="https://www.linkedin.com/in/lukasz-smigiel/">
            <img
              className={classes["footer-small-logos"]}
              src={liLogo}
              alt="LI"
            />
          </a>
        </li>
        <li>
          <span>Szymon Chiczewski</span>
          <a target='_blank' href="https://github.com/szymon-chiczewski">
            <img
              className={classes["footer-small-logos"]}
              src={githubLogo}
              alt="github"
            />
          </a>
          <a target='_blank' href="https://www.linkedin.com/in/szymon-chiczewski/">
            <img
              className={classes["footer-small-logos"]}
              src={liLogo}
              alt="LI"
            />
          </a>
        </li>
        <li>
          <span>Weronika Niekludow</span>
          <a target='_blank' href="https://github.com/weronika-niekludow">
            <img
              className={classes["footer-small-logos"]}
              src={githubLogo}
              alt="github"
            />
          </a>
          <a target='_blank' href="https://www.linkedin.com/in/weronika-niekludow/">
            <img
              className={classes["footer-small-logos"]}
              src={liLogo}
              alt="LI"
            />
          </a>
        </li>
        <li>
          <span>Olga Kacała</span>
          <a target='_blank' href="https://github.com/olga-kacala">
            <img
              className={classes["footer-small-logos"]}
              src={githubLogo}
              alt="github"
            />
          </a>
          <a target='_blank' href="https://www.linkedin.com/in/olga-kacala/">
            <img
              className={classes["footer-small-logos"]}
              src={liLogo}
              alt="LI"
            />
          </a>
        </li>
      </ul>
    </footer>
  );
};
