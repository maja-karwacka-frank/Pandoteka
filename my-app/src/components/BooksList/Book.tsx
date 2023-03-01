import { Link } from "react-router-dom";
import classes from "./Book.module.css";
import { useContext } from "react";
import { AppContext } from "../../providers/AppProvider";

export const Book = (book: any) => {
  const { addToFav, isLogged, myBookList } = useContext(AppContext);
const classesTitle = `${classes.title} ${classes.overflowEllipsis}`


  return (
  

      <div className={classes.book}>
        <Link to={`/book/${book.id}`} {...book}>
        <div>
          <img className={classes.cover} src={book.cover_img} alt="cover" />
        </div>
        </Link>
        <div>
          <div>
            <span className={classesTitle}>{book.title}</span>
          </div>

          <div>
            <span className={classes.overflowEllipsis}>{book.author}</span>
          </div>

          <div className={classes.publishYear}>
            <span>First Publish Year: </span>
            <span>{book.first_publish_year}</span>
          </div>
          {isLogged && (
            <button
              disabled={myBookList.some(
                (singleBook) => singleBook.id === book.id
              )}
              onClick={() =>
                addToFav({
                  title: book.title,
                  cover_img: book.cover_img,
                  author: book.author,
                  id: book.id,
                })
              }
            ></button>
          )}
        </div>
      </div>
    
  );
};
