import { useState } from "react";
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post('http://localhost:4000/posts', {
      title
    }).then(() => {}).catch((error) => {
      console.log("checking error response", error);
    });
    console.log("checking response", response);
    setTitle('');
  }

  return (
    <div>
      <form onSubmit={handlePostSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input className="form-control" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default PostCreate;