import { useNavigate } from "react-router-dom";
import { DirectoryItemProps } from "./directory-item.interface";

import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from "./directory-item.styles";

const DirectoryItem: React.FunctionComponent<DirectoryItemProps> = ({
  directory,
}) => {
  const { title, imageUrl, route } = directory;

  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
