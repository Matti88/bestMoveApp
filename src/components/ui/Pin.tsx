
interface PinProps {
  size?: number;
  color?: string;
}

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

const Pin = ({ size = 20, color = '#d00' }: PinProps) => {
  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      style={{ ...pinStyle, fill: color }}
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 2.25 1 4.25 2.5 5.5L12 22l4.5-7.5C18 13.25 19 11.25 19 9c0-3.87-3.13-7-7-7zM12 12.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 5.5 12 5.5 15.5 7.07 15.5 9 13.93 12.5 12 12.5z" />
    </svg>
  );
};

// Pin.js 
export default Pin;

// const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
//   c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
//   C20.1,15.8,20.2,15.8,20.2,15.7z`;