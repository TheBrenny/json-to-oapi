const convert = require('@openapi-contrib/json-schema-to-openapi-schema');


async function convert() {
    const schema = {}; // get from one text box
    const convertedSchema = await convert(schema);
    console.log(convertedSchema); // pump to another text box
}