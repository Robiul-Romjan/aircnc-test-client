import CategoryBox from "./CategoryBox";
import { categories } from "./categoryData";

const Category = () => {
    return (
        <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
            {
                categories.map((item, i)=> <CategoryBox key={i} label={item.label} icon={item.icon} />)
            }
        </div>
    );
};

export default Category;