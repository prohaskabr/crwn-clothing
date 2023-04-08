import CategoryItem from '../category-item/category-item.component';
import './categories.style.scss'

const Categories = ({categories})=>{     
      return (
        <div className="categories-container">
          {categories.map((c) => (
            <CategoryItem key={c.id} category={c} />
          ))}
        </div>
      );

}

export default Categories;