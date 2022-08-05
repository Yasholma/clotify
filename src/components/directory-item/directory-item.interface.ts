export interface DirectoryItemProps {
  directory: IDirectoryItem;
}

export interface IDirectoryItem {
  id: number;
  title: string;
  imageUrl: string;
  route: string;
}
