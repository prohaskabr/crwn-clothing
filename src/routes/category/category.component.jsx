import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect, Fragment } from 'react';
import { selectCategoriesMap, selectIsCategoriesLoading } from '../../store/categories/caretory.selector';
import Spinner from '../../components/spinner/spinner.component';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsCategoriesLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);
    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {
                isLoading ?
                    (<Spinner />) :
                    (<div className='category-container'>

                        {
                            products && products.map((prod) => (<ProductCard key={prod.id} product={prod} />))
                        }
                    </div>)
            }

        </Fragment>
    )

}

export default Category;