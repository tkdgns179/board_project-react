import { produceWithPatches } from "immer";
import React from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import classes from "./CommentsUI.module.css";

const CommentBox = ({ comment, allComments }) => {
  const children = allComments.filter((c) => comment.commentId === c.parentId);

  return (
    <React.Fragment>
      <Comment.Content>
        <Comment.Author as="a">{comment.userId}</Comment.Author>
        <Comment.Metadata>
          <div>{comment.createdDate}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.content}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      {children.length >= 1 && (
        <Comment.Group>
          <CommentBoxes comments={children} allComments={allComments} />
        </Comment.Group>
      )}
    </React.Fragment>
  );
};

const CommentBoxes = ({ comments, allComments }) => {
  const isArr = Array.isArray(comments);
  return (
    <React.Fragment>
      {!isArr && (
        <Comment
          key={comments.commentId}
          style={{ paddingLeft: `${comments.level - 1}rem` }}
        >
          <CommentBox comment={comments} allComments={allComments} />
        </Comment>
      )}
      {isArr &&
        comments.map((c) => (
          <Comment
            key={c.commentId}
            // style={{ paddingLeft: `${c.level - 1}rem` }}
          >
            <CommentBox comment={c} allComments={allComments} />
          </Comment>
        ))}
    </React.Fragment>
  );
};

const CommentsUI = ({ comments }) => {
  // const rootComments = comments.filter((comment) => comment.parentId === null);
  const minLevelComments = comments.filter(
    (comment) => comment.level === comment.minLevel
  );
  console.log(minLevelComments);
  // const groupComments = [];
  // let arr = [];
  // for (let idx = 0; idx < comments.length; idx++) {
  //   if (idx + 1 === comments.length) {
  //     arr.push(comments[idx]);
  //     groupComments.push(arr);
  //     arr = null;
  //     break;
  //   } else if (comments[idx].groupId === comments[idx + 1].groupId) {
  //     arr.push(comments[idx]);
  //   } else if (comments[idx].groupId !== comments[idx + 1].groupId) {
  //     arr.push(comments[idx]);
  //     groupComments.push(arr);
  //     arr = [];
  //   }
  // }

  // console.log("GroupComments : ", groupComments)

  return (
    <Comment.Group className={classes.comments}>
      <Header as="h3" dividing></Header>

      {minLevelComments.map((c) => (
        <CommentBoxes
          comments={c}
          allComments={comments}
          key={c.commentId}
        ></CommentBoxes>
      ))}

      <Comment>
        <Comment.Content>
          <Comment.Author as="a">Matt</Comment.Author>
          <Comment.Metadata>
            <div>Today at 5:42PM</div>
          </Comment.Metadata>
          <Comment.Text>How artistifsd!</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>

      <Comment>
        <Comment.Content>
          <Comment.Author as="a">Elliot Fu</Comment.Author>
          <Comment.Metadata>
            <div>Yesterday at 12:30AM</div>
          </Comment.Metadata>
          <Comment.Text>
            <p>This has been very useful for my research. Thanks as well!</p>
          </Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
        <Comment.Group>
          <Comment>
            <Comment.Content>
              <Comment.Author as="a">Jenny Hess</Comment.Author>
              <Comment.Metadata>
                <div>Just now</div>
              </Comment.Metadata>
              <Comment.Text>Elliot you are always so right :)</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
          <Comment.Group>
            <Comment>
              <Comment.Content>
                <Comment.Author as="a">Jenny Hess</Comment.Author>
                <Comment.Metadata>
                  <div>Just now</div>
                </Comment.Metadata>
                <Comment.Text>Elliot you are always so right :)</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </Comment.Group>
      </Comment>

      <Comment>
        {/* <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" /> */}
        <Comment.Content>
          <Comment.Author as="a">Joe Henderson</Comment.Author>
          <Comment.Metadata>
            <div>5 days ago</div>
          </Comment.Metadata>
          <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>

      <Form reply>
        <Form.TextArea />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    </Comment.Group>
  );
};

export default CommentsUI;
