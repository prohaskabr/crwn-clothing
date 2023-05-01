import { Link } from 'react-router-dom';
import './directory-item.style.scss'

const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  return (
    <div className="directory-item-container">
      <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="body">
        <h2>{title}</h2>
        <Link className='title' to={`shop/${title}`}> <p>Shop now</p></Link>
      </div>
    </div>
  )
}

export default DirectoryItem;