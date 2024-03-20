import axios from "axios";
import { useEffect, useState } from "react";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const response = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(response.data);
  }

  const renderedComments = comments.map(comment => {
    return <li key={comment.id}>{comment.content}</li>
  })

  useEffect(() => {
    fetchComments();
  },[]);

  return (
    <ul>
      {renderedComments}
    </ul>
  );
}

export default CommentList;