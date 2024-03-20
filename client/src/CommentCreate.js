import axios from "axios";
import { useState } from "react";

const CommentCreate = ({ postId }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: newComment
    });

    setNewComment('');
  }

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input className="form-control" value={newComment} onChange={event => setNewComment(event.target.value)} />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CommentCreate;