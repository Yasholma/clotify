import CategoryItem from "../category-item/category-item.component";
import { ICategoryItem } from "../category-item/category-item.interface";
import { DirectoryProps } from "./directory.interface";

import "./directory.styles.scss";

const Directory: React.FunctionComponent<DirectoryProps> = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category: ICategoryItem) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
