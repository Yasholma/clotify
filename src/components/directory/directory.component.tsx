import DirectoryItem from "../directory-item/directory-item.component";
import { IDirectoryItem } from "../directory-item/directory-item.interface";
import { DirectoryProps } from "./directory.interface";

import "./directory.styles.scss";

const Directory: React.FunctionComponent<DirectoryProps> = ({
  directories,
}) => {
  return (
    <div className="directory-container">
      {directories.map((directory: IDirectoryItem) => (
        <DirectoryItem key={directory.id} directory={directory} />
      ))}
    </div>
  );
};

export default Directory;
