// Project details data
const projectDetails = [
    {
        id: 'online-retail',
        title: 'Online Retail Sales Analysis',
        description: 'A comprehensive analysis of online retail sales data using Power BI and SQL. This project includes time series analysis, revenue tracking, and customer segmentation.',
        technologies: ['Power BI', 'SQL', 'Excel'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        features: [
            'Interactive KPI dashboards',
            'Customer segmentation analysis',
            'Sales trend visualization',
            'Revenue forecasting',
            'Product performance metrics'
        ],
        challenges: 'The main challenge was cleaning and transforming a large dataset with inconsistent formatting and missing values. I implemented data validation rules and used SQL queries to standardize the data before visualization.',
        outcomes: 'The analysis revealed key insights about customer purchasing patterns and identified top-performing products. The interactive dashboards enabled stakeholders to make data-driven decisions, resulting in a 15% increase in targeted marketing effectiveness.'
    },
    {
        id: 'ecommerce-analytics',
        title: 'E-commerce Sales Analytics',
        description: 'An analysis of customer purchasing behavior for an e-commerce platform using Python and Power BI. The project includes interactive dashboards for tracking sales performance and customer metrics.',
        technologies: ['Python', 'Power BI', 'Pandas', 'Matplotlib'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
        features: [
            'Customer behavior analysis',
            'Sales performance tracking',
            'Product recommendation engine',
            'Cohort analysis',
            'Conversion rate optimization'
        ],
        challenges: 'Integrating data from multiple sources and creating a unified view was challenging. I developed a Python ETL pipeline to extract, transform, and load data from various sources into a centralized database.',
        outcomes: 'The analysis helped identify key customer segments and optimize marketing strategies. The recommendation engine improved cross-selling opportunities by 20% and increased average order value by 12%.'
    }
];

// Function to get project by ID
function getProjectById(id) {
    return projectDetails.find(project => project.id === id);
}

// Export the functions and data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projectDetails, getProjectById };
}