function formatDay(date) {
    return `${date.getFullYear()}-${
        (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${
        date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`;
}