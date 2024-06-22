import { MouseEvent, PropsWithChildren, useEffect, useState } from 'react';

import { useReactionContext } from '../../providers';

import styles from './ReactionWrapper.module.scss';
import { Reaction } from './Reaction';

interface Reaction {
  id: number;
  x: number;
  y: number;
  avatar: string;
  comment: string;
  isEditing: boolean;
}

export function ReactionWrapper({ children }: PropsWithChildren) {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const { isAdding } = useReactionContext();

  useEffect(() => {
    const savedReactions = JSON.parse(localStorage.getItem('reactions') || '[]') as Reaction[];
    setReactions([...savedReactions]);
  }, []);

  useEffect(() => {
    if (reactions.length > 0) {
      localStorage.setItem('reactions', JSON.stringify(reactions));
    }
  }, [reactions]);

  const handleAddReaction = (e: MouseEvent<HTMLDivElement>) => {
    if (!isAdding || (e.target as HTMLElement).closest('.reaction')) return;

    const { clientX, clientY } = e;
    const newReaction: Reaction = {
      id: Math.random(),
      x: clientX,
      y: clientY,
      avatar: '😊',
      comment: '',
      isEditing: true,
    };
    setReactions([...reactions, newReaction]);
  };

  const handleCommentChange = (id: number, newComment: string) => {
    setReactions(
      reactions.map((reaction) =>
        reaction.id === id ? { ...reaction, comment: newComment } : reaction
      )
    );
  };

  const handleCommentSubmit = (id: number) => {
    setReactions(
      reactions.map((reaction) =>
        reaction.id === id ? { ...reaction, isEditing: !reaction.isEditing } : reaction
      )
    );
  };
  const handleDeleteReaction = (id: number) => {
    setReactions(reactions.filter((reaction) => reaction.id !== id));
  };

  return (
    <div className={styles.wrapper} onClick={handleAddReaction}>
      {reactions.map((reaction) => (
        <Reaction
          key={reaction.id}
          handleCommentChange={handleCommentChange}
          handleCommentSubmit={handleCommentSubmit}
          handleDeleteReaction={handleDeleteReaction}
          {...reaction}
        />
      ))}
      {children}
    </div>
  );
}
