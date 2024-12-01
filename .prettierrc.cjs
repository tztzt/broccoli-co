module.exports = {
    plugins: [
        'prettier-plugin-packagejson',
        '@trivago/prettier-plugin-sort-imports',
    ],
    printWidth: 80,
    tabWidth: 2,
    trailingComma: 'all',
    singleQuote: true,
    semi: true,
    importOrder: ['^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
