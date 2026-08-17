const problems = [
    {
        id: 1,
        number: 1,
        name: "Two Sum",
        difficulty: "Easy",
        pattern: "Array",
        source: "LeetCode",
        status: "Attempting"
    },
    {
        id: 2,
        number: 21,
        name: "Merge Two Sorted Lists",
        difficulty: "Easy",
        pattern: "Linked List",
        source: "LeetCode",
        status: "Solved"
    },
    {
        id: 3,
        number: 53,
        name: "Maximum Subarray",
        difficulty: "Medium",
        pattern: "Array",
        source: "LeetCode",
        status: "Attempting"
    }
];

export const getProblems = (req, res) => {
    res.json(problems);
};

//to add new problems
export const createProblem=(req,res)=>{
    const newProblem=req.body;//req.body = data sent inside the request
    problems.push(newProblem);//adds the new problem to our temporary array
    res.status(201).json(newProblem);
};