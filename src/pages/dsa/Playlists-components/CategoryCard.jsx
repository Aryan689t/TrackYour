import "./CategoryCard.css";

function CategoryCard({ icon, name, problems }) {

    return (
        <div className="categoryCard">
            <div className="categoryLeft">
                <div className="categoryIcon">
                    {icon}
                </div>
                <div>
                    <h3>{name}</h3>
                    <p>{problems} Problems</p>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;