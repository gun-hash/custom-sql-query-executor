const Schema = ({ data, tableName }) => {
    return (
        <div style={styles.tableContainer}>
            <h2 style={styles.tableTitle}>{tableName}</h2>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        {Object.keys(data[0]).map(key => (
                            <th key={key} style={styles.headerCell}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} style={styles.tableRow}>
                            {Object.values(row).map((value, idx) => (
                                <td key={idx} style={styles.tableCell}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    tableContainer: {
        padding: '10px'
    },
    tableTitle: {
        textAlign: 'center',
        marginBottom: '10px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#f4f4f4'
    },
    headerCell: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        fontWeight: 'bold'
    },
    tableRow: {},
    tableCell: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left'
    }
};

export default Schema