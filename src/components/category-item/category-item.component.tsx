import { CategoryItemProps } from "./category-item.interface";

import "./category-item.styles.scss";

const CategoryItem: React.FunctionComponent<CategoryItemProps> = ({
  category,
}) => {
  const { id, title, imageUrl } = category;

  return (
    <div className="category-container" key={id}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
