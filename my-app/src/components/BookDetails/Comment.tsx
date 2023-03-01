import { AppContext } from "../../providers/AppProvider";
import { useContext } from "react";
import { MyComment } from "./BookDetails";
import classes from "./Comment.module.css";

export type MyCommentProps = {
  item: MyComment;
  removeComment: (commId: number) => void;
};

export const Comment = ({
  item,
  removeComment,
}: MyCommentProps): JSX.Element => {
  const { username } = useContext(AppContext);
  const dateString = new Date(item.CreatedAt);
  const date = dateString.toLocaleDateString();

  return (
    <div className={classes["single-comment-wrapper"]}>
      <div className={classes["single-comment"]}>
      <p className={classes["comment-author-p"]}>
        {item.user} wrote on:&nbsp;
        {date}
      </p>
        <div className={classes["comment-conatiner"]}>
          <p className={classes["comment-message"]}>"{item.message}"</p>
        </div>
      </div> 
      {username === item.user && (
            <button className={classes["comment-button"]} onClick={() => removeComment(item.id)}>Remove</button>
          )}
    </div>
    
  );
};
