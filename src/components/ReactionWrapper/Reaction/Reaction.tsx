import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import styles from './Reaction.module.scss';

interface ReactionProps {
  id: number;
  x: number;
  y: number;
  avatar: string;
  comment: string;
  isEditing: boolean;
  handleCommentChange: (id: number, newComment: string) => void;
  handleCommentSubmit: (id: number) => void;
  handleDeleteReaction: (id: number) => void;
}

export function Reaction({
  id,
  x,
  y,
  avatar,
  comment,
  isEditing,
  handleCommentChange,
  handleCommentSubmit,
  handleDeleteReaction,
}: ReactionProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommentSubmit(id);
      setTimeout(() => {
        setIsHovered(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (isEditing) setIsHovered(isEditing);
  }, [isEditing]);

  return (
    <div
      className={`${styles.reactionBlock} reaction`}
      style={{ position: 'absolute', left: x, top: y - 38 }}
      key={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div className={styles.avatar}>{avatar}</div>
      </div>
      {isHovered && (
        <div className={styles.commentBlock}>
          {isEditing ? (
            <>
              <textarea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  handleCommentChange(id, e.target.value)
                }
                onKeyDown={handleKeyPress}
                autoFocus
              />
              <button className={styles.deleteButton} onClick={() => handleDeleteReaction(id)}>
                Delete
              </button>
            </>
          ) : (
            <div className={styles.comment} onClick={() => handleCommentSubmit(id)}>
              {comment}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
