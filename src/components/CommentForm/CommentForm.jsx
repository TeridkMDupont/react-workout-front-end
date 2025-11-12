import { useState } from 'react';
import styles from './CommentForm.module.css';

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleAddComment(formData)
    setFormData({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor='text-input' className={styles.label}>Your comment:</label>
      <textarea
        required
        type='text'
        name='text'
        id='text-input'
        value={formData.text}
        onChange={handleChange}
        className={styles.textarea}
        placeholder='Share your thoughts...'
      />
      <button type='submit' className={styles.submitButton}>Submit Comment</button>
    </form>
  );
};

export default CommentForm;