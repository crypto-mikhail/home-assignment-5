import { MouseEvent } from 'react';

import { useReactionContext } from '../../providers';

export function ToggleButton() {
  const { isAdding, toggleAdding } = useReactionContext();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleAdding();
  };

  return (
    <button onClick={handleClick} className="toggle-button">
      {isAdding ? 'Disable Adding Reactions' : 'Enable Adding Reactions'}
    </button>
  );
}
