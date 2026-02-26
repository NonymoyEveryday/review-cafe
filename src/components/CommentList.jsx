function CommentList({ comments }) {
  return (
    <div className="mt-4">
      <h5>รีวิว</h5>
      {comments.map((c, index) => (
        <div key={index} className="border p-2 mb-2">
          <strong>{c.username}</strong>
          <p>{c.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;