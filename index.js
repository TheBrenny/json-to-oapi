const converter = require('@openapi-contrib/json-schema-to-openapi-schema');

async function processConversion(data) {
    if (typeof data === "string") data = JSON.parse(data);
    const convertedSchema = await converter(data);
    return convertedSchema;
}

globalThis.processConversion = processConversion;