import CategoryItem from '../categoty-item/category-item.component';
import './directory.style.scss'

const Directory = ({categories})=>{
    return (<div className="directory-container">
    {categories.map((c) => (
      <CategoryItem key={c.id} category={c} />
    ))}
  </div>
  );
}

export default Directory;