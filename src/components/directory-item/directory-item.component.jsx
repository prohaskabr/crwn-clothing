import { useNavigate } from 'react-router-dom';
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles';

const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  const navigate = useNavigate();

  const clickHandler = (route) => {
    navigate(route);
  };

  return (
    <DirectoryItemContainer onClick={() => clickHandler(`shop/${title}`)}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem;