import CategoryCard from "./CategoryCard";
import "./CategorySection.css";

function CategorySection(){

    const categories = [

    {
        icon:"📦",
        name:"Arrays",
        problems:42
    },

    {
        icon:"🧠",
        name:"Dynamic Programming",
        problems:31
    },

    {
        icon:"🕸️",
        name:"Graphs",
        problems:18
    },

    {
        icon:"🌳",
        name:"Trees",
        problems:27
    },

    {
        icon:"↔️",
        name:"Sliding Window",
        problems:16
    },

    {
        icon:"🔍",
        name:"Binary Search",
        problems:24
    },

    {
        icon:"👑",
        name:"Greedy",
        problems:19
    },

    {
        icon:"#️⃣",
        name:"Hash Map",
        problems:29
    }

];

    return(
        <section className="categorySection">
            <div className="categoryHeader">
                <h2>Auto Categorized Collections</h2>
                <p>
                    Automatically grouped from solved problems.
                </p>
            </div>
            <div className="categoryGrid">
                {
                    categories.map((category,index)=>(
                      <CategoryCard
    key={index}
    icon={category.icon}
    name={category.name}
    problems={category.problems}
/>
                    ))
                }
            </div>
        </section>
    );
}

export default CategorySection;