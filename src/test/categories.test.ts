import { CategoryAPI } from "../class/Category";

(async () => {
    let categories = await CategoryAPI.getCategories();

    console.log(categories);

    let category = await CategoryAPI.getCategory(2);

    console.log(category);

    let categoryResources = await CategoryAPI.getCategoryResources(2);

    console.log(categoryResources);
    
})();