import React, { useState, useRef, useEffect, HTMLAttributes } from 'react';

interface SwitchProps extends HTMLAttributes<HTMLDivElement> {
  initialChecked?: boolean; 
  onCheckedChange?: (checked: boolean) => void; 
  disabled?: boolean; 
}

const Switch: React.FC<SwitchProps> = ({
  initialChecked = false,
  onCheckedChange,
  disabled = false,
  className, 
  ...props 
}) => {
  const [checked, setChecked] = useState(initialChecked);
  const switchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChecked(initialChecked);
  }, [initialChecked]);

  const toggleSwitch = () => {
    if (disabled) return;
    const newCheckedState = !checked;
    setChecked(newCheckedState);
    onCheckedChange?.(newCheckedState); 
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault(); 
      toggleSwitch();
    }
  };

  return (
    <div
      ref={switchRef}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0} 
      onClick={toggleSwitch}
      onKeyDown={handleKeyDown}
      className={`
        relative inline-flex h-5 w-9 cursor-pointer rounded-full border-2 border-transparent 
        transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-black
        ${checked ? 'bg-black' : 'bg-gray-200'}
        ${disabled ? 'cursor-not-allowed opacity-60' : ''}
        ${className || ''}
      `}
      {...props}
    >
      <span
        aria-hidden="true" 
        className={`
          pointer-events-none inline-block h-4 w-4 transform translate-y-[0.5px] rounded-full bg-white shadow-lg 
          ring-0 transition duration-200 ease-in-out
          ${checked ? 'translate-x-4' : 'translate-x-[2px]'}
        `}
      ></span>
    </div>
  );
};

export default Switch;