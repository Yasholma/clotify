import { DirectoryItemProps } from "./directory-item.interface";

import "./directory-item.styles.scss";

const DirectoryItem: React.FunctionComponent<DirectoryItemProps> = ({
  directory,
}) => {
  const { id, title, imageUrl } = directory;

  return (
    <div className="directory-item-container" key={id}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="directory-item-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
