import React from 'react';
import {Svg, Path} from 'react-native-svg';

interface StarIconProps {
  size: number;
  filled?: boolean;
}

const StarIcon: React.FC<StarIconProps> = ({size, filled = true}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={'black'}>
      <Path
        fill={filled ? '#FFDA18' : 'none'}
        stroke="#FFDA18"
        d="M20.283 11.554h.005l-2.869 2.475-.23.198.07.295 1.286 5.444v.002a1.038 1.038 0 0 1-1.55 1.128l-4.733-2.913L12 18.02l-.262.162-4.735 2.912h-.001a1.037 1.037 0 0 1-1.547-1.127v-.001l1.29-5.444.07-.296-.23-.198-4.218-3.64a1.043 1.043 0 0 1 .589-1.828l5.53-.446.304-.025.117-.283 2.134-5.164a1.033 1.033 0 0 1 1.913 0l2.133 5.164.117.283.305.025 5.53.446a1.043 1.043 0 0 1 .593 1.829l-1.349 1.164Z"
      />
    </Svg>
  );
};

export default StarIcon;
