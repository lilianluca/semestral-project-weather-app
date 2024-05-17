import React from "react";

const ContextMenu = ({
  rightClickItem,
  positionX,
  positionY,
  isToggled,
  buttons,
  contextMenuRef,
}) => {
  return (
    <menu
      ref={contextMenuRef}
      style={{
        top: positionY + 2 + 'px',
        left: positionX + 2 + 'px',
      }}
      className={`context-menu ${isToggled ? 'active' : ''}`}
    >
      {buttons.map((button, index) => {
        const handleClick = (e) => {
          e.stopPropagation();
          button.onClick(e, rightClickItem);
          console.log(rightClickItem)
        };

        return (
          <button
            onClick={handleClick}
            key={index}
            className='context-menu-button'
          >
            <span>{button.text}</span>
          </button>
        );
      })}
    </menu>
  );
};

export default ContextMenu;
