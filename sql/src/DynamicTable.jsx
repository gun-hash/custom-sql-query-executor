import React from 'react';

const DynamicTable = ({ data }) => {
    // Check if data is available
    if (!data || data.length === 0) {
        return <p>No data to display</p>;
    }

    // Extract column headers (keys of the objects) from the first row
    const headers = Object.keys(data[0]);

    return (
        <table>
            <thead>
                <tr>
                    {headers.map(header => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {headers.map(header => (
                            <td key={`${index}-${header}`}>{row[header]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DynamicTable;
