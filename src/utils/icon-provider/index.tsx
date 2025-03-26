// main
import { FC } from 'react';
import * as Icons from 'iconsax-react';
import { IconProps } from 'iconsax-react';

interface customIconProps extends IconProps {
  icon: keyof typeof Icons;
}

const IconProvider: FC<customIconProps> = ({ icon, ...props }) => {
  const IconComponent = Icons[icon]; // every icon in iconsax is an icon component. for example Home icon is equal to HomeComponent
  return (
    <IconComponent {...props} /> //<HomeComponent  {...props}/>
  );
};
export default IconProvider;
