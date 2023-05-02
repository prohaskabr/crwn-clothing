import { Link } from 'react-router-dom';
import { BackgroundImage, Body, ItemContainer } from './directory-item.style';

const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  return (
    <ItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <Link className='title' to={`shop/${title}`}> <p>Shop now</p></Link>
      </Body>
    </ItemContainer>
  )
}

export default DirectoryItem;